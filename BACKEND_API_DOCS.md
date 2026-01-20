# Cort X AI - Enhanced Backend Documentation

## Overview

Your Vercel backend now includes:
- ✅ Email notifications (leads, deals, verification)
- ✅ JWT authentication system
- ✅ Webhook integration for third-party services
- ✅ HubSpot CRM integration
- ✅ Admin dashboard with statistics
- ✅ MongoDB lead/contact storage

---

## Environment Variables Required

Add these to Vercel **Settings → Environment Variables**:

```env
# Database
MONGODB_URI=mongodb+srv://Vercel-Admin-Cort-x-ai:6doYRg0KJRoAxnhT@cort-x-ai.sexvjqw.mongodb.net/?retryWrites=true&w=majority

# Email Service (Gmail, SendGrid, or custom SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=hello@cortxai.com
ADMIN_EMAIL=hello@cortxai.com

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this
LEADS_API_KEY=my-leads-secret-key-2024

# HubSpot (Optional)
HUBSPOT_API_KEY=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Webhooks
WEBHOOK_SECRET=your-webhook-secret
```

---

## API Endpoints

### 1. **Lead Submission** (AI Call Agent)
**POST** `/api/leads`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "company": "Tech Corp",
  "interest": "Sales Agents"
}
```

**Triggers:**
- ✉️ Email notification to admin
- 📊 MongoDB storage
- 🔗 HubSpot contact creation
- 🪝 Webhook trigger

---

### 2. **Contact Form Submission**
**POST** `/api/contact`
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "company": "Business Inc",
  "interest": "Lead Generation",
  "message": "Tell me about your services"
}
```

**Triggers:**
- ✉️ Email notification
- 📊 MongoDB storage
- 🔗 HubSpot contact creation
- 🪝 Webhook trigger

---

### 3. **Get All Leads** (Protected)
**GET** `/api/get-leads?type=all&limit=100`

**Headers:**
```
Authorization: Bearer my-leads-secret-key-2024
```

**Query Parameters:**
- `type`: `all` | `leads` | `contacts` (default: all)
- `limit`: number (default: 100)
- `skip`: number for pagination (default: 0)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "timestamp": "2025-01-18T10:00:00Z",
      "type": "lead"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 100,
    "skip": 0
  }
}
```

---

### 4. **Admin Statistics** (Protected)
**GET** `/api/admin-stats`

**Headers:**
```
Authorization: Bearer admin-token-here
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "leadsCount": 45,
    "contactsCount": 32,
    "leadsToday": 5,
    "contactsToday": 3,
    "totalSubmissions": 77,
    "conversionRate": "58.44%"
  },
  "recentActivity": {
    "leads": [...],
    "contacts": [...]
  }
}
```

---

### 5. **Register Webhook** (Protected)
**POST** `/api/webhooks`

**Headers:**
```
Authorization: Bearer admin-token-here
```

**Body:**
```json
{
  "url": "https://your-app.com/webhooks/leads",
  "events": ["lead.created", "contact.created", "deal.closed"]
}
```

**Webhook Events:**
- `lead.created` - New lead submitted
- `contact.created` - New contact form submitted
- `deal.closed` - Deal closed (when manual sync)
- `email.sent` - Email notification sent

**Webhook Payload:**
```json
{
  "type": "lead.created",
  "timestamp": "2025-01-18T10:00:00Z",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "company": "Tech Corp"
  }
}
```

---

### 6. **List Webhooks** (Protected)
**GET** `/api/webhooks`

**Headers:**
```
Authorization: Bearer admin-token-here
```

---

## Authentication Flow

### Generate Admin Token (For Development)

Use Node.js to generate a token:

```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { 
    userId: 'admin-user-123',
    email: 'admin@cortxai.com',
    role: 'admin'
  },
  'your-super-secret-jwt-key-change-this',
  { expiresIn: '24h' }
);

console.log(token);
```

Use this token in Authorization header: `Bearer <token>`

---

## Email Templates

### Lead Notification Email
Sent to admin when new lead submits form with:
- Lead name, email, company
- Timestamp
- Link to Leads Dashboard

### Deal Closed Email
Sent when deal is closed with:
- Deal amount (highlighted in green)
- Client name
- Timestamp

---

## HubSpot Integration

When configured, automatically creates:
- **Contacts** with lifecycle stage "subscriber" or "lead"
- **Deals** when deals are closed
- **Associations** between deals and contacts

### HubSpot Setup:
1. Get API key from HubSpot: Settings → Integrations → Private Apps
2. Create new private app with scopes:
   - `crm.objects.contacts.read` & `.write`
   - `crm.objects.deals.read` & `.write`
   - `crm.objects.deals.lifecycle`
3. Add token to Vercel as `HUBSPOT_API_KEY`

---

## Webhook Retry Logic

- **Automatic Retries:** Failed webhooks retry up to 10 times
- **Disable:** Webhook disabled after 10 consecutive failures
- **Track:** View `lastTriggeredAt` and `failureCount` for each webhook

---

## Email Service Setup

### Gmail (Free)
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use as `EMAIL_PASSWORD`

### SendGrid (Recommended)
1. Get API key from SendGrid
2. Configure as SMTP:
   - Host: `smtp.sendgrid.net`
   - Port: `587`
   - User: `apikey`
   - Password: `<SendGrid API Key>`

### Custom SMTP
Configure your own SMTP server details in env variables.

---

## Usage Examples

### JavaScript/Fetch
```javascript
// Submit lead
const response = await fetch('https://your-domain.com/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1-555-0123',
    company: 'Tech Corp'
  })
});

const data = await response.json();
console.log('Lead ID:', data.leadId);
```

### cURL
```bash
curl -X POST https://your-domain.com/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0123",
    "company": "Tech Corp"
  }'
```

### Python
```python
import requests

response = requests.post(
    'https://your-domain.com/api/leads',
    json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'phone': '+1-555-0123',
        'company': 'Tech Corp'
    }
)

print(response.json())
```

---

## Monitoring & Debugging

### Check Logs
Visit Vercel Dashboard → Deployments → Click latest → Runtime Logs

### Common Issues

**"Email service not configured"**
- Set `EMAIL_USER` and `EMAIL_PASSWORD` in Vercel

**"Database not configured"**
- Ensure `MONGODB_URI` is set in Vercel env vars

**Webhook failures**
- Check webhook URL is publicly accessible
- Verify webhook secret matches
- Check firewall/security rules

---

## Next Steps

1. ✅ Add your email configuration
2. ✅ Generate JWT secret (strong password)
3. ✅ Optionally connect HubSpot
4. ✅ Register webhooks for third-party integrations
5. ✅ Test with Leads Manager dashboard

---

**Questions?** Check the [Leads Manager](/leads) page or contact support.
