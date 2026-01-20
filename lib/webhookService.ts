import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

interface Webhook {
  _id?: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: Date;
  lastTriggeredAt?: Date;
  failureCount: number;
}

interface WebhookEvent {
  type: 'lead.created' | 'lead.updated' | 'contact.created' | 'deal.closed' | 'email.sent';
  timestamp: Date;
  data: any;
}

export async function triggerWebhooks(event: WebhookEvent): Promise<void> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MongoDB not configured');
    return;
  }

  let client: MongoClient | null = null;

  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db('cort_xai');
    const webhooksCollection = db.collection('webhooks');

    // Find matching webhooks
    const webhooks = await webhooksCollection.find({
      events: { $in: [event.type, '*'] },
      active: true,
    }).toArray() as Webhook[];

    // Trigger each webhook
    for (const webhook of webhooks) {
      triggerWebhookAsync(webhook, event, webhooksCollection);
    }
  } catch (error) {
    console.error('Error triggering webhooks:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

async function triggerWebhookAsync(webhook: Webhook, event: WebhookEvent, collection: any): Promise<void> {
  try {
    const response = await fetch(webhook.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.WEBHOOK_SECRET || '',
        'X-Event-Type': event.type,
        'X-Event-Timestamp': event.timestamp.toISOString(),
      },
      body: JSON.stringify(event),
    });

    if (response.ok) {
      // Update last triggered
      await collection.updateOne(
        { _id: webhook._id },
        {
          $set: { lastTriggeredAt: new Date() },
          $set: { failureCount: 0 },
        }
      );
    } else {
      // Increment failure count
      await collection.updateOne(
        { _id: webhook._id },
        { $inc: { failureCount: 1 } }
      );

      // Disable webhook if too many failures
      if ((webhook.failureCount || 0) + 1 > 10) {
        await collection.updateOne(
          { _id: webhook._id },
          { $set: { active: false } }
        );
      }
    }
  } catch (error) {
    console.error(`Failed to trigger webhook ${webhook.url}:`, error);
    await collection.updateOne(
      { _id: webhook._id },
      { $inc: { failureCount: 1 } }
    );
  }
}

export async function registerWebhook(url: string, events: string[], token: string): Promise<Webhook | null> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) return null;

  let client: MongoClient | null = null;

  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db('cort_xai');
    const webhooksCollection = db.collection('webhooks');

    const webhook: Webhook = {
      url,
      events,
      active: true,
      createdAt: new Date(),
      failureCount: 0,
    };

    const result = await webhooksCollection.insertOne(webhook);
    return { ...webhook, _id: result.insertedId.toString() };
  } catch (error) {
    console.error('Error registering webhook:', error);
    return null;
  } finally {
    if (client) {
      await client.close();
    }
  }
}

export async function listWebhooks(token: string): Promise<Webhook[]> {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) return [];

  let client: MongoClient | null = null;

  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db('cort_xai');
    const webhooksCollection = db.collection('webhooks');

    return (await webhooksCollection.find({}).toArray()) as Webhook[];
  } catch (error) {
    console.error('Error listing webhooks:', error);
    return [];
  } finally {
    if (client) {
      await client.close();
    }
  }
}
