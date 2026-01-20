import { VercelRequest, VercelResponse } from '@vercel/node';
import { extractTokenFromHeader, verifyToken, isAdminToken } from '../lib/authService';
import { listWebhooks, registerWebhook } from '../lib/webhookService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  if (req.method === 'GET') {
    // List all webhooks
    try {
      const webhooks = await listWebhooks(token);
      return res.status(200).json({ success: true, data: webhooks });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list webhooks' });
    }
  }

  if (req.method === 'POST') {
    // Register new webhook
    const { url, events } = req.body;

    if (!url || !events || !Array.isArray(events)) {
      return res.status(400).json({ error: 'Missing required fields: url, events' });
    }

    try {
      const webhook = await registerWebhook(url, events, token);
      if (!webhook) {
        return res.status(500).json({ error: 'Failed to register webhook' });
      }

      return res.status(201).json({ success: true, data: webhook });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to register webhook' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
