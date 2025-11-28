import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company, interest } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Store lead data (you can integrate with your CRM or database here)
    // For now, we'll log it and send a confirmation
    const leadData = {
      name,
      email,
      phone,
      company,
      interest,
      timestamp: new Date().toISOString(),
      source: 'AI Call Agent',
    };

    console.log('New lead collected:', leadData);

    // Optional: Send email notification or webhook to your CRM
    // Example: await notifyCRM(leadData);
    
    // Optional: Store in database
    // Example: await db.leads.create(leadData);

    return res.status(200).json({
      success: true,
      message: 'Lead information received successfully',
      leadId: `lead_${Date.now()}`,
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    return res.status(500).json({ error: 'Failed to process lead information' });
  }
}
