# API Configuration Guide

## Overview
This document explains how to set up all required API credentials and OAuth configurations for Cort X AI.

## 1. Google Business Profile API

### Prerequisites
- Google Cloud Project
- Billing enabled on the project

### Setup Steps

1. **Create Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project

2. **Enable APIs**
   - Enable "My Business API"
   - Enable "Google+ API"
   - Enable "Gemini API"

3. **Create OAuth 2.0 Credentials**
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     ```
     http://localhost:5173
     http://localhost:3000
     https://yourdomain.com
     ```
   - Add authorized redirect URIs:
     ```
     http://localhost:5173/oauth/callback
     http://localhost:3000/oauth/callback
     https://yourdomain.com/oauth/callback
     ```
   - Copy Client ID and Client Secret

4. **Environment Variables**
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   VITE_GOOGLE_CLIENT_SECRET=your-client-secret
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/oauth/callback
   ```

### API Scopes Required
```
https://www.googleapis.com/auth/business.manage
https://www.googleapis.com/auth/userinfo.email
https://www.googleapis.com/auth/userinfo.profile
```

## 2. Google Gemini API

### Setup Steps

1. **Get API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create new API key
   - Copy the key

2. **Environment Variable**
   ```env
   VITE_API_KEY=your-gemini-api-key
   ```

### Model Used
- `gemini-2.5-flash` - For fast content generation
- Alternative: `gemini-pro` - For more complex analysis

## 3. Facebook/Meta Integration

### Setup Steps

1. **Create Facebook App**
   - Visit [Meta Developers](https://developers.facebook.com/)
   - Go to "My Apps" → "Create App"
   - Choose "Business" app type
   - Fill in app details

2. **Configure Facebook Login**
   - Add "Facebook Login" product
   - Set redirect URIs:
     ```
     http://localhost:5173/social/facebook/callback
     https://yourdomain.com/social/facebook/callback
     ```

3. **Get Business Manager Access**
   - Request Pages Manager scope
   - Get your Page Access Token

4. **Environment Variables**
   ```env
   VITE_FACEBOOK_APP_ID=your-app-id
   VITE_FACEBOOK_APP_SECRET=your-app-secret
   ```

### Required Scopes
```
pages_manage_posts
pages_read_engagement
pages_manage_metadata
```

## 4. Instagram Integration

### Setup Steps

1. **Use Facebook App (Same as above)**

2. **Configure Instagram Business Account**
   - Convert personal account to business account
   - Connect to Facebook Page

3. **Get Instagram Credentials**
   - Obtain Instagram User ID
   - Request Instagram Business Content Publish scope

4. **Environment Variables**
   ```env
   VITE_INSTAGRAM_APP_ID=your-instagram-app-id
   ```

### Required Scopes
```
instagram_business_content_publish
instagram_business_manage_messages
```

## 5. LinkedIn Integration

### Setup Steps

1. **Create LinkedIn App**
   - Visit [LinkedIn Developer Portal](https://www.linkedin.com/developers/apps)
   - Create new app
   - Get Organization ID

2. **Configure Redirect URLs**
   - Add authorized redirect URI:
     ```
     http://localhost:5173/social/linkedin/callback
     https://yourdomain.com/social/linkedin/callback
     ```

3. **Get Credentials**
   - Client ID
   - Client Secret

4. **Environment Variables**
   ```env
   VITE_LINKEDIN_CLIENT_ID=your-client-id
   VITE_LINKEDIN_CLIENT_SECRET=your-client-secret
   ```

### Required Scopes
```
w_member_social
r_liteprofile
w_organization_social
```

## 6. Twitter/X Integration

### Setup Steps

1. **Create Twitter Developer App**
   - Visit [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
   - Create new project and app
   - Select "Native App" type for mobile, "Web App" for web

2. **Configure OAuth**
   - Set Redirect URLs:
     ```
     http://localhost:5173/social/twitter/callback
     https://yourdomain.com/social/twitter/callback
     ```
   - Enable "3-legged OAuth"
   - Request write permissions

3. **Get Credentials**
   - API Key (Consumer Key)
   - API Secret Key (Consumer Secret)
   - Bearer Token (for app-only auth)

4. **Environment Variables**
   ```env
   VITE_TWITTER_API_KEY=your-api-key
   VITE_TWITTER_API_SECRET=your-api-secret
   VITE_TWITTER_BEARER_TOKEN=your-bearer-token
   ```

### Required Permissions
```
tweet.write
tweet.read
users.read
follows.write
```

## 7. Complete .env.local File

Create `.env.local` in the project root:

```env
# Google APIs
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_SECRET=your-client-secret
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/oauth/callback
VITE_API_KEY=your-gemini-api-key

# Facebook & Instagram
VITE_FACEBOOK_APP_ID=your-facebook-app-id
VITE_FACEBOOK_APP_SECRET=your-facebook-app-secret

# LinkedIn
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
VITE_LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Twitter/X
VITE_TWITTER_API_KEY=your-twitter-api-key
VITE_TWITTER_API_SECRET=your-twitter-api-secret
VITE_TWITTER_BEARER_TOKEN=your-twitter-bearer-token
```

## 8. Testing OAuth Flows

### Local Development
1. Start dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:5173`

3. Click "Connect New Profile"

4. Select platform and authorize

### Troubleshooting

#### Redirect URI Mismatch
- Ensure redirect URI in OAuth config matches exactly
- Check for `http://` vs `https://`
- Check for trailing slashes

#### Token Expiration
- Implement automatic token refresh
- Store refresh tokens securely
- Handle 401 responses gracefully

#### Scope Issues
- Verify all required scopes are requested
- Check platform documentation for scope names
- Some platforms require additional approvals

## 9. Production Deployment

### Security Best Practices

1. **Never commit secrets**
   ```bash
   echo ".env.local" >> .gitignore
   ```

2. **Use environment-specific configs**
   - `env.development.local`
   - `env.production.local`

3. **Rotate credentials regularly**
   - Update API keys monthly
   - Monitor unauthorized access attempts

4. **Use secure storage**
   - Store secrets in environment variables
   - Use managed secrets service (e.g., AWS Secrets Manager)
   - Never hardcode credentials

### Deployment Variables
Set these in your hosting platform:

#### Netlify
- Add in Site Settings → Build & Deploy → Environment

#### Vercel
- Add in Project Settings → Environment Variables

#### AWS
- Use AWS Secrets Manager or Parameter Store

#### Docker
- Use Docker secrets or environment files

## 10. Rate Limiting

### API Rate Limits

| API | Limit | Window |
|-----|-------|--------|
| Google Business Profile | 1000 | Day |
| Gemini API | 15 | Minute (free) |
| Facebook Graph API | 200 | Hour |
| LinkedIn | 1000 | Month |
| Twitter API v2 | 450 | 15 min |

### Handling Rate Limits
```typescript
// Implement exponential backoff
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const retryWithBackoff = async (fn, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const waitTime = Math.pow(2, i) * 1000;
        await delay(waitTime);
      } else {
        throw error;
      }
    }
  }
};
```

## 11. Monitoring & Logging

### Log API Usage
```typescript
// Log all API calls
const logApiCall = (endpoint, method, statusCode, duration) => {
  console.log(`[${new Date().toISOString()}] ${method} ${endpoint} - ${statusCode} (${duration}ms)`);
};
```

### Monitor Quota
- Use Google Cloud Console to monitor quota usage
- Set up alerts for quota approaching limits
- Implement circuit breakers for failing services

## Support
For issues with API setup, refer to:
- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Google Business Profile API Docs](https://developers.google.com/my-business)
- [Meta Developers](https://developers.facebook.com/)
- [LinkedIn Developers](https://developer.linkedin.com/)
- [Twitter Developers](https://developer.twitter.com/)
