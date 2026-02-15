# Environment Setup Guide

This guide will help you configure all API credentials for real-time integration with Google Business Profile, social media platforms, and website analytics.

## Prerequisites

- All API credentials should be stored in a `.env.local` file in the root directory
- Never commit `.env.local` to version control
- The app uses Vite, so all env variables must be prefixed with `VITE_`

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```
# Google Business Profile
VITE_GBP_ACCESS_TOKEN=your_gbp_access_token
VITE_GBP_LOCATION_ID=your_gbp_location_id
VITE_GBP_ACCOUNT_ID=accounts/your_account_id

# Google PageSpeed API
VITE_GOOGLE_PAGESPEED_API_KEY=your_google_pagespeed_api_key
VITE_WEBSITE_URL=https://yourwebsite.com

# Facebook
VITE_FACEBOOK_ACCESS_TOKEN=your_facebook_access_token
VITE_FACEBOOK_PAGE_ID=your_facebook_page_id

# Instagram
VITE_INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
VITE_INSTAGRAM_ACCOUNT_ID=your_instagram_business_account_id

# LinkedIn
VITE_LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token
VITE_LINKEDIN_ORG_ID=your_linkedin_organization_id

# Twitter/X
VITE_TWITTER_BEARER_TOKEN=your_twitter_bearer_token
VITE_TWITTER_USER_ID=your_twitter_user_id
```

## Getting Your Credentials

### 1. Google Business Profile

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Google Business Profile API" and "Google My Business API"
4. Create OAuth 2.0 credentials (Service Account or OAuth 2.0 Client)
5. Generate an access token
6. Get your location ID from your GBP dashboard

**Resources:**
- [GBP API Documentation](https://developers.google.com/my-business/content/static/docs/getting_started)
- [OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)

### 2. Google PageSpeed Insights API

**Steps:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the "PageSpeed Insights API"
3. Create an API Key in Credentials
4. Copy the API key to `VITE_GOOGLE_PAGESPEED_API_KEY`

**Resources:**
- [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)

### 3. Facebook Graph API

**Steps:**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app (type: Business)
3. Add "Instagram Graph API" and "Marketing API" products
4. Generate a Page Access Token
5. Get your Page ID from your Facebook business page

**Resources:**
- [Facebook Graph API Docs](https://developers.facebook.com/docs/graph-api)
- [Access Tokens Guide](https://developers.facebook.com/docs/facebook-login/access-tokens)

### 4. Instagram Graph API

**Steps:**
1. Use the same Facebook Developer app from step 3
2. Connect your Instagram Business Account
3. Get your Instagram Business Account ID
4. Use the same access token or generate a new one

**Resources:**
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-api)
- [Business Account Setup](https://developers.facebook.com/docs/instagram-api/getting-started)

### 5. LinkedIn API

**Steps:**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create an app
3. Request access to the "Sign In with LinkedIn" or "Marketing Developer Platform"
4. Generate an OAuth token
5. Get your Organization URN (format: urn:li:organization:123456789)

**Resources:**
- [LinkedIn API Docs](https://docs.microsoft.com/en-us/linkedin/shared/api-fundamentals/overview)
- [OAuth Setup Guide](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication)

### 6. Twitter/X API

**Steps:**
1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal)
2. Create a project and app
3. Generate API keys and Bearer Token
4. Apply for elevated access if needed
5. Get your User ID

**Resources:**
- [Twitter API v2 Docs](https://developer.twitter.com/en/docs/twitter-api)
- [Authentication Guide](https://developer.twitter.com/en/docs/authentication/oauth-2-0)

## Using Credentials in the App

### In Development

The app will automatically read credentials from `.env.local`:

```typescript
const token = import.meta.env.VITE_GBP_ACCESS_TOKEN;
const locationId = import.meta.env.VITE_GBP_LOCATION_ID;
```

### In Production (Vercel)

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all the variables from your `.env.local` file
4. Redeploy the application

## Initializing the Real-Time Dashboard

Once you have all credentials set up, pass them to the GBPDashboard component:

```tsx
<GBPDashboard
  gbpAccessToken={import.meta.env.VITE_GBP_ACCESS_TOKEN}
  gbpLocationId={import.meta.env.VITE_GBP_LOCATION_ID}
/>
```

Or initialize the dashboard service directly:

```typescript
import { realtimeSyncDashboard } from './services/realtimeSyncDashboard';

await realtimeSyncDashboard.initialize({
  gbpAccessToken: import.meta.env.VITE_GBP_ACCESS_TOKEN,
  gbpLocationId: import.meta.env.VITE_GBP_LOCATION_ID,
  fbAccessToken: import.meta.env.VITE_FACEBOOK_ACCESS_TOKEN,
  fbPageId: import.meta.env.VITE_FACEBOOK_PAGE_ID,
  // ... more credentials
});

// Start auto-syncing every 5 minutes
realtimeSyncDashboard.startAutoSync(300);

// Get all data
const data = await realtimeSyncDashboard.fetchAllData();
```

## Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore` by default
2. **Use environment-specific tokens** - Keep production tokens separate
3. **Rotate tokens regularly** - Generate new tokens periodically
4. **Scope permissions** - Request only the permissions you need
5. **Monitor token usage** - Check your API dashboards for unusual activity
6. **Use service accounts** - For backend services, use Google service accounts instead of OAuth

## Rate Limits

Different APIs have different rate limits:

- **Google Business Profile**: 100 requests per day (varies by permission level)
- **Google PageSpeed Insights**: 25,000 queries per day
- **Facebook Graph API**: Depends on tier, typically millions per day
- **Instagram Graph API**: Same as Facebook
- **LinkedIn API**: Varies by permission level
- **Twitter API v2**: Depends on tier (Free, Basic, Pro, Enterprise)

## Testing Credentials

Once configured, test by running:

```bash
npm run dev
```

Navigate to the GBP Dashboard and click "Refresh Stats" to verify all credentials are working.

## Troubleshooting

### "Failed to fetch Google Business Profile data"
- Check that your access token is valid and not expired
- Verify the location ID is correct
- Ensure the GBP API is enabled in Google Cloud Console

### "CORS Error"
- Some APIs may require a backend proxy for CORS
- Consider setting up a backend service to forward API requests

### "401 Unauthorized"
- Token has expired - generate a new one
- Check token permissions are sufficient for the requested scope

### "Rate limit exceeded"
- Wait before making more requests
- Check your API quota in the developer console

## Support

For issues with specific APIs:
- Google: https://support.google.com/business
- Facebook: https://www.facebook.com/help
- Instagram: https://help.instagram.com
- LinkedIn: https://www.linkedin.com/help
- Twitter: https://developer.twitter.com/support
