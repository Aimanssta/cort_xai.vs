# Cort X AI - Real-Time Business Optimization Platform

A comprehensive optimization platform that connects with Google Business Profile, social media platforms, and website analytics to provide real-time performance metrics and automated optimization strategies.

## 🚀 Features

### Google Business Profile Integration
- ✅ Real-time profile insights (views, calls, directions, website visits)
- ✅ Automated daily posts for optimization
- ✅ Review management and auto-replies
- ✅ 30-day trend analytics
- ✅ Performance metrics dashboard

### Social Media Management
- ✅ Facebook Graph API integration
- ✅ Instagram Business Account integration
- ✅ LinkedIn organization posting
- ✅ Twitter/X API v2 integration
- ✅ Multi-platform content publishing
- ✅ Real-time engagement tracking

### Website Analytics
- ✅ Google PageSpeed Insights integration
- ✅ SEO analysis and scoring
- ✅ Website uptime monitoring
- ✅ Performance metrics tracking
- ✅ Accessibility auditing
- ✅ Best practices scoring

### Smart Features
- 🤖 AI-powered optimization suggestions (Gemini AI)
- 📊 Live dashboard with real-time data
- 🔄 Auto-sync every 5 minutes
- 🎯 Scheduled posting automation
- 📈 Historical trend analysis
- 🔐 OAuth 2.0 authentication for all platforms

## 🏗️ Tech Stack

- **Frontend**: React 19, TypeScript 5.8, Vite 6
- **UI Components**: Recharts, Lucide React, Tailwind CSS
- **APIs**:
  - Google Business Profile API v1
  - Google PageSpeed Insights v5
  - Facebook Graph API v18.0
  - Instagram Graph API v18.0
  - LinkedIn API v2
  - Twitter API v2
  - Google Gemini AI API
- **Build**: Vite with TypeScript strict mode
- **Deployment**: Vercel

## 📋 Prerequisites

Before you start, you'll need:

1. **Node.js** 18+ and npm
2. **Git** for version control
3. API credentials for:
   - Google Cloud (GBP, PageSpeed, Gemini)
   - Facebook/Instagram (Meta)
   - LinkedIn Developer Platform
   - Twitter Developer Platform

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aimanssta/cort-x-ai.git
cd "cort-x-ai"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Business Profile
VITE_GBP_ACCESS_TOKEN=your_gbp_access_token
VITE_GBP_LOCATION_ID=your_gbp_location_id
VITE_GBP_ACCOUNT_ID=accounts/your_account_id

# Google APIs
VITE_GOOGLE_PAGESPEED_API_KEY=your_pagespeed_api_key
VITE_GOOGLE_GEMINI_API_KEY=your_gemini_api_key
VITE_WEBSITE_URL=https://yourwebsite.com

# Facebook
VITE_FACEBOOK_ACCESS_TOKEN=your_facebook_token
VITE_FACEBOOK_PAGE_ID=your_page_id

# Instagram
VITE_INSTAGRAM_ACCESS_TOKEN=your_instagram_token
VITE_INSTAGRAM_ACCOUNT_ID=your_account_id

# LinkedIn
VITE_LINKEDIN_ACCESS_TOKEN=your_linkedin_token
VITE_LINKEDIN_ORG_ID=your_org_id

# Twitter
VITE_TWITTER_BEARER_TOKEN=your_twitter_token
VITE_TWITTER_USER_ID=your_user_id
```

**Detailed setup guide**: See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md)

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Project Structure

```
├── components/
│   ├── GBPDashboard.tsx          # Google Business Profile dashboard
│   ├── SocialMediaManager.tsx     # Social media management
│   ├── WebsiteAnalysis.tsx        # Website performance analysis
│   ├── PostScheduler.tsx          # Post automation scheduler
│   └── Layout.tsx                 # Navigation layout
├── services/
│   ├── googleBusinessProfileRealtime.ts  # GBP real-time API
│   ├── socialMediaRealtime.ts            # Social media APIs
│   ├── websiteAnalyticsRealtime.ts       # Website analytics APIs
│   ├── realtimeSyncDashboard.ts          # Unified dashboard service
│   ├── geminiService.ts                  # AI suggestions
│   └── [other services]
├── types.ts                       # TypeScript type definitions
├── App.tsx                        # Main app routing
├── index.tsx                      # React entry point
└── vite.config.ts                 # Vite configuration
```

## 🎯 Key Services

### Real-Time API Integration

All API services are built for real-time data fetching with proper error handling:

```typescript
import { realtimeSyncDashboard } from './services/realtimeSyncDashboard';

// Initialize with credentials
await realtimeSyncDashboard.initialize({
  gbpAccessToken: import.meta.env.VITE_GBP_ACCESS_TOKEN,
  gbpLocationId: import.meta.env.VITE_GBP_LOCATION_ID,
  // ... other credentials
});

// Start auto-syncing every 5 minutes
realtimeSyncDashboard.startAutoSync(300);

// Fetch all data
const data = await realtimeSyncDashboard.fetchAllData();

// Publish across all platforms
await realtimeSyncDashboard.publishAcrossAllPlatforms(
  'Check out our new product!',
  'https://example.com/image.jpg'
);
```

### Google Business Profile Service

```typescript
import { googleBusinessProfileAPI } from './services/googleBusinessProfileRealtime';

await googleBusinessProfileAPI.initialize(accessToken, accountId);

// Get real-time insights
const insights = await googleBusinessProfileAPI.getInsights(
  locationId,
  startDate,
  endDate,
  ['QUERY_DIRECT', 'CALL', 'WEBSITE_CLICKS']
);

// Create a post
await googleBusinessProfileAPI.createPost(locationId, 'Your post content');

// Get reviews
const reviews = await googleBusinessProfileAPI.getReviews(locationId);
```

### Social Media Services

```typescript
import {
  facebookAPI,
  instagramAPI,
  linkedinAPI,
  twitterAPI,
} from './services/socialMediaRealtime';

// Publish to multiple platforms
await facebookAPI.publishPost('Content', imageUrl);
await instagramAPI.publishPost('Content', imageUrl);
await linkedinAPI.publishPost('Content');
await twitterAPI.publishTweet('Content');

// Get insights
const fbInsights = await facebookAPI.getPageInsights();
const igInsights = await instagramAPI.getAccountInsights();
```

### Website Analytics Service

```typescript
import { pageSpeedInsights } from './services/websiteAnalyticsRealtime';

// Analyze website
const analysis = await pageSpeedInsights.analyzeWebsite(url);

// Get SEO analysis
const seoAnalysis = await pageSpeedInsights.analyzeSEO(url);

// Check uptime
const uptime = await pageSpeedInsights.checkWebsiteUptime(url);
```

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub:
```bash
git push origin master
```

2. Go to [Vercel](https://vercel.com) and link your GitHub repository

3. Add environment variables in Vercel dashboard:
   - Project Settings → Environment Variables
   - Add all variables from your `.env.local`

4. Deploy automatically on push or manually click "Deploy"

### Build for Production

```bash
npm run build
npm run preview
```

## 📊 Using the Dashboard

### 1. GBP Dashboard
- View real-time profile statistics
- See 30-day trends
- Check reviews and ratings
- Monitor direct vs indirect queries

### 2. Social Media Manager
- View accounts and insights
- Schedule and publish posts
- Track engagement metrics
- Multi-platform posting

### 3. Website Analysis
- PageSpeed scores (Mobile & Desktop)
- SEO scoring and recommendations
- Accessibility metrics
- Performance monitoring

### 4. Post Scheduler
- Create scheduled posts
- Auto-optimize content with AI
- Multi-platform publishing
- Schedule by date/time

## 🔐 Security

- All API tokens are stored in `.env.local` (never commit)
- OAuth 2.0 authentication for all platforms
- CORS-compliant API calls
- XSS protection with React's built-in sanitization
- Environment-specific configurations

## 📈 API Rate Limits

- **Google Business Profile**: 100 requests/day (varies by tier)
- **Google PageSpeed Insights**: 25,000 queries/day
- **Facebook/Instagram**: Depends on tier (typically millions/day)
- **LinkedIn**: Varies by permission level
- **Twitter API v2**: Depends on tier

## 🐛 Troubleshooting

### Build Errors
- Clear node_modules: `rm -r node_modules package-lock.json`
- Reinstall: `npm install`
- Rebuild: `npm run build`

### API Connection Issues
- Verify credentials in `.env.local`
- Check token expiration dates
- Ensure APIs are enabled in developer consoles
- Review CORS settings for your domain

### Data Not Showing
- Check browser console for errors
- Verify environment variables are loaded
- Ensure tokens have required permissions
- Check API rate limits

**More help**: See [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) for detailed troubleshooting

## 📝 Changelog

### v1.0.0 - Real-Time Integration Release
- ✅ Real-time API services for all platforms
- ✅ Live dashboard with auto-sync
- ✅ Multi-platform content publishing
- ✅ Comprehensive analytics
- ✅ Vercel deployment
- ✅ Environment setup guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🌐 Live Demo

**Production URL**: [cort-xai-vs-bvsr-3qgj2tp48-aimansstas-projects.vercel.app](https://cort-xai-vs-bvsr-3qgj2tp48-aimansstas-projects.vercel.app)

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check [ENV_SETUP_GUIDE.md](./ENV_SETUP_GUIDE.md) for setup help
- Review API documentation links in the guide

## 🎉 Quick Start Commands

```bash
# Install
npm install

# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint
npm run lint
```

---

**Built with ❤️ for business optimization**

Last updated: 2024
