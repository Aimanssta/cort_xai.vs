# AI Calling Agent Setup Guide

## Overview
Your website now has a live AI calling agent that can answer visitor questions and collect lead information. The agent appears as a floating button on all pages.

## Features
✅ **Answer Everything** — Agent can answer FAQs, product questions, and more  
✅ **Lead Collection** — Collects name, email, phone, company, and interests  
✅ **WebRTC Voice** — Direct browser-to-agent voice communication  
✅ **Floating Widget** — Non-intrusive, always available  
✅ **Call Duration Tracking** — Shows how long the call has been active  

## Prerequisites
- Retell AI Account (free tier available at https://retellai.com)
- Google Gemini API Key (already configured)

## Step 1: Set Up Retell AI

### Create a Retell AI Account
1. Go to https://retellai.com
2. Sign up for a free account
3. Log in to your dashboard

### Create an AI Agent
1. Go to **Agents** → **Create New Agent**
2. Configure your agent with the following system prompt:

```
You are an AI sales agent for Cort X AI. Your role is to:

1. **Answer Questions** — Respond knowledgeably about:
   - AI Sales Agents (autonomous calling, real-time objection handling, natural conversation)
   - Lead Generation Tools (intelligent lead scoring, qualification automation)
   - Local AIO (local SEO, Google My Business optimization, review management)
   - Pricing and features
   - Implementation process

2. **Objection Handling** — Address common concerns:
   - Integration with existing CRMs
   - Time to value
   - ROI and success metrics
   - Data privacy and security

3. **Lead Qualification** — Ask relevant questions:
   - Company type and size
   - Current pain points
   - Budget range
   - Timeline for implementation

4. **Lead Collection** — Near the end of conversation, say something like:
   "I'd love to help you get started! Let me collect your information so our team can reach out with a customized demo."
   
   Then mention: "I'll be asking you for your name, email, and phone number on the next screen."

5. **Tone** — Be friendly, professional, and solution-oriented.
```

3. Click **Create Agent** to save

### Get Your API Credentials
1. Go to your agent's **Settings**
2. Copy the **Agent ID**
3. Go to **Account Settings** → **API Keys**
4. Copy your **API Key**

## Step 2: Configure Environment Variables

Update `.env.local` with your Retell AI credentials:

```env
VITE_RETELL_API_KEY=your_api_key_here
VITE_RETELL_AGENT_ID=your_agent_id_here
```

Also add to Vercel production environment:
```bash
vercel env add VITE_RETELL_API_KEY production
vercel env add VITE_RETELL_AGENT_ID production
```

## Step 3: Lead Collection API

The component sends lead data to `/api/leads`. Currently it:
- Logs leads to console
- Returns success confirmation

### Optional: Connect to Your CRM
Update `api/leads.ts` to integrate with your CRM:

```typescript
// Example: Send to HubSpot
import hubspot from '@hubspot/api-client';

const hubspotClient = new hubspot.Client({ 
  accessToken: process.env.HUBSPOT_ACCESS_TOKEN 
});

// In handler function:
const contact = await hubspotClient.crm.contacts.basicApi.create({
  properties: [
    { name: 'firstname', value: name },
    { name: 'email', value: email },
    { name: 'phone', value: phone },
    { name: 'company', value: company },
  ],
});
```

## Step 4: Testing Locally

1. Start your dev server:
```bash
npm run dev
```

2. Click the **"Talk to AI Agent"** floating button
3. Grant microphone permissions when prompted
4. Start speaking — the agent will listen and respond
5. After the call ends, fill in the lead form
6. Click **"Submit Information"**

## Step 5: Deploy to Production

1. Commit and push changes:
```bash
git add components/AICallAgent.tsx api/leads.ts .env.local
git commit -m "feat: add AI calling agent with lead collection"
git push origin main
```

2. Trigger Vercel deployment:
```bash
vercel --prod
```

3. Verify the agent works on production URL

## Customization Options

### Change Button Position
Edit `components/AICallAgent.tsx`:
```tsx
<button
  className="fixed bottom-6 right-6"  // Change these values
```

### Customize Agent Appearance
Modify the modal styling:
```tsx
<div className="bg-gradient-to-r from-blue-600 to-blue-700">  // Change colors
```

### Add Custom Fields to Lead Form
Update `CallState` interface:
```tsx
collectedData: {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  custom_field: string;  // Add here
}
```

## Troubleshooting

### Microphone Not Working
- Check browser microphone permissions
- Verify microphone is not in use by another app
- Try a different browser

### Agent Not Responding
- Verify Retell AI credentials in environment
- Check API key hasn't expired
- View browser console for errors

### Leads Not Submitting
- Check `/api/leads` endpoint is reachable
- Verify email field is populated
- View browser network tab for errors

## Monitoring & Analytics

### View Lead Data
Leads are logged to:
- **Local dev**: Browser console → check `/api/leads` calls
- **Production**: Vercel logs → Dashboard → Monitoring

### Track Engagement
Add analytics to `AICallAgent.tsx`:
```tsx
// On call start
gtag.event('ai_call_started', { timestamp: new Date() });

// On call end
gtag.event('ai_call_ended', { duration: callDuration });

// On lead submitted
gtag.event('lead_collected', { source: 'ai_agent' });
```

## Support
- Retell AI docs: https://docs.retellai.com
- Retell AI support: support@retellai.com
- Your Cort X AI team: hello@cortxai.com

---

**Next Steps:**
1. ✅ Create Retell AI account and agent
2. ✅ Get API credentials
3. ✅ Update `.env.local`
4. ✅ Test locally
5. ✅ Deploy to production
6. ✅ Monitor leads and optimize agent responses
