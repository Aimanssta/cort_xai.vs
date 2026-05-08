import { VercelRequest, VercelResponse } from '@vercel/node';
import Retell from 'retell-sdk';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { agent_id } = req.body;

    if (!agent_id) {
      return res.status(400).json({ error: 'agent_id is required' });
    }

    const apiKey = process.env.VITE_RETELL_API_KEY;
    if (!apiKey) {
      console.error('VITE_RETELL_API_KEY not configured');
      return res.status(500).json({ error: 'Retell API key not configured' });
    }

    // Initialize Retell client with API key
    const client = new Retell({
      apiKey: apiKey,
    });

    // Create a web call with the agent
    const callResponse = await client.call.createWebCall({
      agent_id: agent_id,
    });

    // Return the access token
    return res.status(200).json({
      access_token: callResponse.access_token,
      call_id: callResponse.call_id,
    });
  } catch (error) {
    console.error('Error creating call:', error);
    return res.status(500).json({
      error: 'Failed to create call',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
