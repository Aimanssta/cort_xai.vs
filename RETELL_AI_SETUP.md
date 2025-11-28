# AI Voice Calling Agent - Setup Instructions

## What's Been Fixed

The AI calling agent component has been completely rewritten to use the **correct Retell SDK** for WebRTC voice communication:

### Changes Made:

1. **Replaced SDK**: Changed from `retell-sdk` (backend REST API) to `retell-client-js-sdk` (frontend WebRTC client)
   - Installed: `npm install retell-client-js-sdk`
   - Installed: `npm install -D @vercel/node` (for backend types)

2. **Frontend Component** (`components/AICallAgent.tsx`):
   - Uses `RetellWebClient` for actual WebRTC voice communication
   - Properly handles call lifecycle events (call_started, call_ended, transcript)
   - Supports mute/unmute during calls
   - Displays live transcript
   - Collects lead information after calls end

3. **Backend API** (`api/create-call.ts`):
   - Creates WebRTC call sessions using Retell REST API
   - Returns access token needed to establish WebRTC connection
   - Handles errors gracefully

### Architecture Flow:

```
1. User clicks "Start Call" button
   ↓
2. Frontend calls `/api/create-call` with agent_id
   ↓
3. Backend uses Retell REST SDK to create call and get access_token
   ↓
4. Frontend receives access_token
   ↓
5. RetellWebClient establishes WebRTC connection using access_token
   ↓
6. Voice conversation happens in real-time
   ↓
7. Agent answers, transcripts display, lead collected after call
```

## What You Need to Do

### 1. Create a Retell AI Agent

Visit https://retellai.com and create an account:
- Create a new **voice agent** (not chat)
- Configure the agent with your system prompt
- Get your **Agent ID** (looks like: `agent_abc123...`)

### 2. Set Up Environment Variables

Get your **Retell API Key** from your account dashboard:
- Visit: https://retellai.com/dashboard/keys

Then update your Vercel project environment variables:

```bash
# Option A: Using Vercel CLI
vercel env add VITE_RETELL_API_KEY your_actual_api_key
vercel env add VITE_RETELL_AGENT_ID your_actual_agent_id

# Option B: Via Vercel Dashboard
# Settings → Environment Variables → Add:
# - VITE_RETELL_API_KEY = your_actual_api_key
# - VITE_RETELL_AGENT_ID = your_actual_agent_id
```

### 3. Test Locally (Optional)

Create `.env.local` file at project root:
```
VITE_RETELL_API_KEY=your_actual_api_key
VITE_RETELL_AGENT_ID=your_actual_agent_id
```

Run locally:
```bash
npm run dev
```

### 4. Deploy

The latest changes are already deployed to:
- **Production**: https://cort-xai-vs-mon4-h4l7zrci0-aimansstas-projects.vercel.app
- **GitHub**: https://github.com/Aimanssta/cort_xai.vs

Once you add the environment variables to Vercel, the agent will be live!

## Testing the Agent

1. Visit your production URL
2. Click the floating "Talk to AI Agent" button
3. Click "Start Call"
4. Speak to the agent
5. Agent will respond with voice
6. Conversation ends after natural conclusion
7. Fill in lead information at the end

## Troubleshooting

### "Failed to get access token for call"
- Check that `VITE_RETELL_API_KEY` is set in Vercel
- Verify your Retell account is active
- Check API key hasn't been regenerated

### No audio during call
- Check browser microphone permissions
- Verify speakers/headphones are working
- Check browser console for errors (F12)

### Agent not responding
- Verify Agent ID is correct in Vercel
- Confirm agent is published in Retell dashboard
- Check agent configuration (system prompt, voice, etc.)

## Files Modified

- `components/AICallAgent.tsx` - Fixed WebRTC implementation
- `api/create-call.ts` - New backend endpoint
- `package.json` - Added `retell-client-js-sdk` and `@vercel/node`

## Next Steps (Optional)

1. **CRM Integration**: Modify `/api/leads.ts` to send leads to your CRM (HubSpot, Salesforce, Pipedrive)
2. **Custom Branding**: Update AICallAgent component with your colors/branding
3. **Lead Qualification**: Add logic to the agent for better lead qualification
4. **Analytics**: Track call metrics and conversions
