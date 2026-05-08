import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { sendEmail, generateLeadNotificationEmail } from '../lib/emailService';
import { triggerWebhooks } from '../lib/webhookService';
import { createHubSpotContact } from '../lib/hubspotService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not configured');
    return res.status(500).json({ error: 'Database not configured' });
  }

  let client: MongoClient | null = null;

  try {
    const { name, email, phone, company, interest } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const leadData = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      interest: interest || '',
      timestamp: new Date(),
      source: 'AI Call Agent',
      status: 'new',
    };

    // Connect to MongoDB
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db('cort_xai');
    const leadsCollection = db.collection('leads');

    // Insert lead
    const result = await leadsCollection.insertOne(leadData);

    console.log('Lead stored in MongoDB:', result.insertedId);

    // Send notification email
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@cortxai.com';
    await sendEmail({
      to: adminEmail,
      subject: `New Lead: ${name}`,
      html: generateLeadNotificationEmail(name, email, company || ''),
    });

    // Create HubSpot contact if configured
    if (process.env.HUBSPOT_API_KEY) {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ') || 'Lead';
      
      await createHubSpotContact({
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        company,
        lifecyclestage: 'subscriber',
      });
    }

    // Trigger webhooks
    await triggerWebhooks({
      type: 'lead.created',
      timestamp: new Date(),
      data: leadData,
    });

    return res.status(200).json({
      success: true,
      message: 'Lead information received successfully',
      leadId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return res.status(500).json({ error: 'Failed to process lead information' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
