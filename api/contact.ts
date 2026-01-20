import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';
import { sendEmail, generateLeadNotificationEmail } from '../lib/emailService';
import { triggerWebhooks } from '../lib/webhookService';
import { createHubSpotContact } from '../lib/hubspotService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not configured');
    return res.status(500).json({ error: 'Database not configured' });
  }

  let client: MongoClient | null = null;

  try {
    const { name, email, company, interest, message } = req.body || {};

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const contactData = {
      name,
      email,
      company: company || '',
      interest: interest || 'General Inquiry',
      message,
      timestamp: new Date(),
      source: 'Contact Form',
      status: 'new',
    };

    // Connect to MongoDB
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db('cort_xai');
    const contactsCollection = db.collection('contacts');

    // Insert contact
    const result = await contactsCollection.insertOne(contactData);

    console.log('Contact stored in MongoDB:', result.insertedId);

    // Send notification email
    const adminEmail = process.env.ADMIN_EMAIL || 'hello@cortxai.com';
    await sendEmail({
      to: adminEmail,
      subject: `New Contact Request: ${name}`,
      html: generateLeadNotificationEmail(name, email, company || ''),
    });

    // Create HubSpot contact if configured
    if (process.env.HUBSPOT_API_KEY) {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ') || 'Contact';
      
      await createHubSpotContact({
        firstname: firstName,
        lastname: lastName,
        email,
        company,
        lifecyclestage: 'lead',
      });
    }

    // Trigger webhooks
    await triggerWebhooks({
      type: 'contact.created',
      timestamp: new Date(),
      data: contactData,
    });

    res.status(200).json({ 
      ok: true, 
      message: 'Contact request received',
      contactId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error processing contact:', error);
    res.status(500).json({ error: 'Failed to process contact request' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}
