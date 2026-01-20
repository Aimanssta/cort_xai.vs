import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Simple auth - you should replace with proper authentication
  const token = req.headers['authorization'];
  if (!token || token !== `Bearer ${process.env.LEADS_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  let client: MongoClient | null = null;

  try {
    const type = req.query.type as string || 'all'; // 'leads', 'contacts', or 'all'
    const limit = parseInt(req.query.limit as string) || 100;
    const skip = parseInt(req.query.skip as string) || 0;

    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db('cort_xai');

    let allData: any[] = [];

    if (type === 'leads' || type === 'all') {
      const leadsCollection = db.collection('leads');
      const leads = await leadsCollection
        .find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      allData = [...allData, ...leads.map(l => ({ ...l, type: 'lead' }))];
    }

    if (type === 'contacts' || type === 'all') {
      const contactsCollection = db.collection('contacts');
      const contacts = await contactsCollection
        .find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      allData = [...allData, ...contacts.map(c => ({ ...c, type: 'contact' }))];
    }

    // Sort by timestamp if mixed
    if (type === 'all') {
      allData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      allData = allData.slice(0, limit);
    }

    const totalLeads = type === 'leads' || type === 'all' 
      ? await db.collection('leads').countDocuments() 
      : 0;
    const totalContacts = type === 'contacts' || type === 'all' 
      ? await db.collection('contacts').countDocuments() 
      : 0;

    return res.status(200).json({
      success: true,
      data: allData,
      pagination: {
        total: type === 'all' ? totalLeads + totalContacts : (type === 'leads' ? totalLeads : totalContacts),
        limit,
        skip,
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({ error: 'Failed to fetch leads' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
