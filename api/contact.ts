import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, company, interest, message } = req.body || {};

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  // NOTE: This endpoint currently logs the contact request and returns success.
  // To send emails or persist leads, configure an email provider or database and
  // add the provider credentials as environment variables in Vercel, then
  // implement the delivery/persistence logic here.

  console.log('Contact request received:', { name, email, company, interest, message });

  res.status(200).json({ ok: true, message: 'Contact request received' });
}
