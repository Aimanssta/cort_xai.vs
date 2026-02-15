# Cort X AI - Google Business Profile & Social Media Optimization Platform

A comprehensive AI-powered platform for managing Google Business Profile listings, automating daily posts, managing social media channels, and optimizing website performance.

## 🚀 Features

### 1. **Google Business Profile (GBP) Management**
- **Live Statistics Dashboard**: Real-time metrics including:
  - Profile views and engagement metrics
  - Phone calls and direction requests
  - Website traffic and visitor data
  - Customer reviews and ratings
  - 30-day trend analysis with charts

### 2. **Daily Automated Post Scheduler**
- **AI-Powered Content Generation**: Automatic content creation using Google Gemini AI
- **Schedule Templates**: Create daily, weekly, or custom-frequency posting schedules
- **Multiple Categories**: Promotional, Educational, Engagement, and Seasonal posts
- **Multi-Platform Publishing**: Automatically post to GBP and connected social media
- **Smart Scheduling**: Configure exact posting times and frequency

### 3. **Social Media Management**
- **Multi-Platform Support**: Facebook, Instagram, LinkedIn, Twitter/X
- **Cross-Platform Posting**: Publish once, reach multiple channels
- **Platform-Specific Formatting**: Auto-formats content for each platform's requirements
- **Account Connection**: OAuth 2.0 integration for secure account access
- **Analytics**: Track post performance across all platforms

### 4. **Website Analysis & SEO Optimization**
- **Comprehensive Website Audits**: 
  - SEO score and optimization recommendations
  - Mobile and desktop performance metrics
  - Accessibility compliance checking
  - Security assessment
- **Issue Tracking**: Categorized issues by severity (Critical, High, Medium, Low)
- **Technical SEO Checklist**: Complete checklist for on-page and technical optimization
- **Core Web Vitals Monitoring**: Track LCP, FID, and CLS metrics
- **Actionable Recommendations**: Priority-ranked optimization suggestions

### 5. **Smart AI Features**
- **AI Content Generation**: Uses Google Gemini API to generate platform-optimized content
- **Auto Review Replies**: Generate professional responses to customer reviews
- **Keyword Discovery**: AI-powered keyword research and ranking suggestions
- **Profile Optimization**: AI suggestions for GBP profile improvements

## 📁 Project Structure

```
cort-x-ai/
├── components/
│   ├── GBPDashboard.tsx          # Live GBP statistics dashboard
│   ├── PostScheduler.tsx          # Daily post automation interface
│   ├── SocialMediaManager.tsx      # Multi-platform social media management
│   ├── WebsiteAnalysis.tsx         # Website SEO and performance analysis
│   ├── Charts.tsx                  # Metrics visualization
│   ├── Layout.tsx                  # Main application layout
│   ├── VoiceChat.tsx              # Voice interaction feature
│   └── ...
├── services/
│   ├── gbpAuthService.ts          # Google OAuth 2.0 authentication
│   ├── gbpDataService.ts          # GBP API data operations
│   ├── postAutomationService.ts   # Post scheduling and automation
│   ├── socialMediaService.ts      # Social media platform integrations
│   ├── websiteAnalysisService.ts  # Website analysis and SEO scanning
│   ├── geminiService.ts           # Google Gemini AI integration
│   └── ...
├── App.tsx                        # Main application component
├── types.ts                       # TypeScript type definitions
├── index.tsx                      # Entry point
└── vite.config.ts                # Vite configuration
```

## 🔑 Key Services

### GBPAuthService
Handles Google Business Profile OAuth 2.0 authentication with token management.

```typescript
const authService = initGBPAuth(clientId, clientSecret, redirectUri);
const accessToken = await authService.getValidAccessToken();
```

### GBPDataService
Manages all GBP data operations including insights, posts, and reviews.

```typescript
const insights = await gbpDataService.getInsights(accountId, locationId, dateRange);
const post = await gbpDataService.createPost(accountId, locationId, content);
const reviews = await gbpDataService.getReviews(accountId, locationId);
```

### PostAutomationService
Handles post scheduling and AI-powered content generation.

```typescript
await postAutomationService.createScheduleTemplate({
  contentTemplate: 'Template content',
  frequency: 'daily',
  timeOfDay: '09:00',
  platforms: ['Google', 'Facebook'],
  category: 'promotional',
  active: true
});
```

### SocialMediaService
Manages connections to social media platforms and cross-posting.

```typescript
await socialMediaService.connectAccount(credentials, businessProfileId);
await socialMediaService.crossPost(businessProfileId, content, platforms, mediaUrls);
```

### WebsiteAnalysisService
Performs comprehensive website analysis for SEO and performance.

```typescript
const metrics = await websiteAnalysisService.analyzeWebsite(websiteUrl);
const recommendations = websiteAnalysisService.getOptimizationRecommendations(metrics);
```

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cort-x-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file:
   ```
   VITE_GOOGLE_CLIENT_ID=your_client_id
   VITE_GOOGLE_CLIENT_SECRET=your_client_secret
   VITE_API_KEY=your_gemini_api_key
   VITE_FACEBOOK_APP_ID=facebook_app_id
   VITE_INSTAGRAM_APP_ID=instagram_app_id
   VITE_LINKEDIN_CLIENT_ID=linkedin_client_id
   VITE_TWITTER_API_KEY=twitter_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Dashboard Features

### GBP Dashboard
- **Key Metrics**: Views, calls, directions, website visits
- **Customer Engagement**: Reviews count and average rating
- **Trend Analysis**: 30-day trends with interactive charts
- **Growth Metrics**: Month-over-month comparison

### Post Scheduler
- **Schedule Management**: Create, edit, and delete post schedules
- **Smart Timing**: Daily/weekly posting at optimal times
- **Content Templates**: Pre-built templates for different content types
- **Platform Selection**: Choose which platforms to post to

### Social Media Manager
- **Account Integration**: Connect all social media accounts
- **Cross-Platform Publishing**: One-click multi-platform posting
- **Performance Tracking**: View engagement metrics per platform
- **Content Calendar**: Manage all posts from one interface

### Website Analysis
- **Performance Scores**: Mobile, desktop, SEO, accessibility scores
- **Issue Detection**: Automated detection of SEO and performance issues
- **Recommendations**: AI-generated optimization recommendations
- **Technical Audit**: Complete technical SEO checklist

## 🤖 AI Integration

### Google Gemini API
- **Profile Optimization**: AI suggestions for GBP profile improvements
- **Content Generation**: Create unique, platform-optimized content
- **Review Responses**: Generate professional customer review replies
- **Keyword Research**: AI-powered keyword discovery and analysis

## 📱 Responsive Design
- Full mobile support with adaptive layouts
- Touch-friendly interface for mobile devices
- Responsive charts and metrics
- Mobile-optimized navigation

## 🔒 Security Features
- OAuth 2.0 authentication for Google and social platforms
- Token refresh and expiration handling
- Secure credential storage
- HTTPS-only API calls

## 📈 Analytics & Reporting
- Real-time metric updates
- Historical trend analysis
- Performance benchmarking
- Engagement tracking across platforms
- SEO performance metrics

## 🛠️ Technology Stack
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **API**: Google APIs, Gemini AI
- **Build**: Vite
- **State Management**: React Hooks
- **Auth**: OAuth 2.0

## 📝 Configuration

### Google Business Profile API
Requires the following scopes:
- `https://www.googleapis.com/auth/business.manage`
- `https://www.googleapis.com/auth/userinfo.email`

### Social Media Platforms
Each platform requires specific OAuth app configuration:
- **Facebook**: Page access tokens
- **Instagram**: Business Graph API access
- **LinkedIn**: OAuth 2.0 credentials
- **Twitter/X**: API v2 credentials

## 🚀 Deployment

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Deploy to Production
The app can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 📚 API Integration Guide

### Google Gemini API
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey });
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});
```

### Google Business Profile API
```typescript
// Example: Get business insights
const insights = await fetch(
  `https://mybusinessapi.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/insights:list`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ /* query */ })
  }
);
```

## 🎯 Future Enhancements
- Advanced analytics and reporting
- A/B testing for posts
- Competitor analysis
- Automated review response workflows
- Advanced scheduling with peak time optimization
- Multi-language content generation
- Integration with Google Ads
- Custom domain analytics

## 📄 License
[Your License Here]

## 🤝 Support
For support, email support@cortxai.com or visit our documentation site.

## 🙏 Acknowledgments
- Google APIs for Business Profile and Gemini
- React community for excellent tools and libraries
- Tailwind CSS for utility-first styling
