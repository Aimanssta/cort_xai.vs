import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { extractTokenFromHeader, verifyToken, isAdminToken } from '../lib/authService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const token = extractTokenFromHeader(authHeader || '');

  if (!token) {
    return res.status(401).json({ error: 'Missing authorization token' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (!isAdminToken(token)) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    return res.status(500).json({ error: 'Database not configured' });
  }

  let client: MongoClient | null = null;

  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db('cort_xai');

    // Get statistics
    const leadsCount = await db.collection('leads').countDocuments();
    const contactsCount = await db.collection('contacts').countDocuments();
    
    const leadsToday = await db.collection('leads').countDocuments({
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    const contactsToday = await db.collection('contacts').countDocuments({
      timestamp: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });

    // Get recent leads
    const recentLeads = await db
      .collection('leads')
      .find()
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    // Get recent contacts
    const recentContacts = await db
      .collection('contacts')
      .find()
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    // Calculate conversion metrics
    const totalSubmissions = leadsCount + contactsCount;
    const conversionRate = totalSubmissions > 0 
      ? ((leadsCount / totalSubmissions) * 100).toFixed(2)
      : '0';

    return res.status(200).json({
      success: true,
      stats: {
        leadsCount,
        contactsCount,
        leadsToday,
        contactsToday,
        totalSubmissions,
        conversionRate: `${conversionRate}%`,
      },
      recentActivity: {
        leads: recentLeads.map(l => ({
          ...l,
          _id: l._id?.toString(),
        })),
        contacts: recentContacts.map(c => ({
          ...c,
          _id: c._id?.toString(),
        })),
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({ error: 'Failed to fetch statistics' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
