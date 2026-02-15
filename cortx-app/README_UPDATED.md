<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Cort X AI - Google Business Profile & Social Media Optimization Platform

> **Transform your digital presence with AI-powered automation**

An intelligent platform for managing Google Business Profile, automating daily posts across multiple social media channels, and optimizing your website for maximum visibility.

## 🎯 What You Get

### 📊 Google Business Profile Management
- Real-time statistics and analytics dashboard
- 30-day trend analysis with interactive charts
- Post management and scheduling
- Automated review responses
- Multi-location support

### 📅 Daily Post Automation
- AI-powered content generation using Google Gemini
- Schedule posts daily, weekly, or on custom frequencies
- Multiple content categories (Promotional, Educational, Engagement, Seasonal)
- One-click multi-platform publishing
- Template management system

### 📱 Social Media Management
- Connect and manage Facebook, Instagram, LinkedIn, and Twitter accounts
- Cross-platform posting in a single click
- Platform-specific content formatting
- Engagement metrics tracking
- Account authorization via OAuth 2.0

### 🔍 Website Analysis & SEO
- Comprehensive website audits
- Performance scoring (SEO, Mobile, Desktop, Accessibility)
- Critical issue identification and prioritization
- Actionable optimization recommendations
- Technical SEO compliance checklist

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API credentials (see [API_CONFIGURATION.md](./API_CONFIGURATION.md))

### Installation

1. **Clone and setup**
   ```bash
   cd cort-x-ai
   npm install
   ```

2. **Configure environment**
   ```bash
   # Create .env.local file with your credentials
   # See API_CONFIGURATION.md for detailed setup
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [README_NEW_FEATURES.md](./README_NEW_FEATURES.md) | Complete feature overview and API reference |
| [API_CONFIGURATION.md](./API_CONFIGURATION.md) | Step-by-step guide for setting up all APIs |
| [QUICK_START.md](./QUICK_START.md) | Getting started guide with examples |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | System design and data flow diagrams |
| [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) | Visual representation of features |
| [IMPLEMENTATION_CHECKLIST.md](./IMPLEMENTATION_CHECKLIST.md) | Verification of all features |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Project completion summary |

## 🏗️ Architecture

The application is built with a modern service-oriented architecture:

```
┌─────────────────────────────────────┐
│     React UI Components             │
│  (Dashboard, Scheduler, Manager)    │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│     Service Layer (TypeScript)      │
│  ├─ GBPAuthService                  │
│  ├─ GBPDataService                  │
│  ├─ PostAutomationService           │
│  ├─ SocialMediaService              │
│  └─ WebsiteAnalysisService          │
└────────────┬────────────────────────┘
             │
┌────────────▼────────────────────────┐
│     External APIs                   │
│  ├─ Google Cloud APIs               │
│  ├─ Social Media APIs               │
│  └─ Gemini AI                       │
└─────────────────────────────────────┘
```

## 🎨 Features in Detail

### GBP Dashboard
- **Live Metrics**: Views, calls, directions, website visits
- **Engagement**: Reviews, ratings, customer messages
- **30-Day Trends**: Interactive line and bar charts
- **Quick Actions**: Direct access to core features

### Post Scheduler
- **Smart Scheduling**: Daily, weekly, or custom frequencies
- **Content Categories**: Promotional, educational, engagement, seasonal
- **AI Generation**: Automatically creates unique content per platform
- **Template System**: Suggestions and custom templates
- **Multi-Platform**: Publish to GBP and social media simultaneously

### Social Media Manager
- **Account Management**: Connect/disconnect accounts
- **Cross-Posting**: One post to multiple platforms
- **Smart Formatting**: Auto-formats content for each platform
- **Engagement Tracking**: Monitor likes, comments, shares
- **Performance Analytics**: See what resonates with your audience

### Website Analysis
- **Performance Scores**: SEO, Mobile, Desktop, Accessibility
- **Issue Detection**: Critical, high, medium, and low priority issues
- **Detailed Reports**: Issue descriptions with solutions
- **Recommendations**: Prioritized optimization suggestions
- **Technical Checklist**: Complete SEO compliance checklist

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript 5.8
- **Styling**: Tailwind CSS
- **Build Tool**: Vite 6.2
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **APIs**: Google Cloud, Gemini AI, Social Media APIs
- **Authentication**: OAuth 2.0

## 📦 Project Structure

```
cort-x-ai/
├── components/
│   ├── GBPDashboard.tsx
│   ├── PostScheduler.tsx
│   ├── SocialMediaManager.tsx
│   ├── WebsiteAnalysis.tsx
│   ├── Charts.tsx
│   ├── Layout.tsx
│   └── VoiceChat.tsx
├── services/
│   ├── gbpAuthService.ts
│   ├── gbpDataService.ts
│   ├── postAutomationService.ts
│   ├── socialMediaService.ts
│   ├── websiteAnalysisService.ts
│   └── geminiService.ts
├── App.tsx
├── types.ts
├── index.tsx
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🔐 Security

- **OAuth 2.0** for all platform authentication
- **Token Management**: Automatic refresh and expiration handling
- **Environment Variables**: All secrets stored securely
- **No Hardcoded Credentials**: Compliant with security best practices
- **HTTPS Ready**: Configured for production deployment

## 📊 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🎯 Supported Platforms

- ✅ Google Business Profile
- ✅ Facebook
- ✅ Instagram
- ✅ LinkedIn
- ✅ Twitter/X

## 🌟 Key Capabilities

### Automation
- Daily AI-generated posts
- Scheduled content publishing
- Automatic review responses
- Cross-platform distribution

### Analytics
- Real-time metrics
- 30-day trend analysis
- Performance tracking
- Engagement metrics

### Optimization
- Website analysis
- SEO recommendations
- Performance scoring
- Issue prioritization

### Integration
- Google Business Profile API
- Facebook Graph API
- Instagram API
- LinkedIn API v2
- Twitter API v2
- Google Gemini AI

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Hosting
The built files in `dist/` can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📖 First Steps

1. **Read [QUICK_START.md](./QUICK_START.md)** for getting started
2. **Configure APIs** using [API_CONFIGURATION.md](./API_CONFIGURATION.md)
3. **Explore Features** in [README_NEW_FEATURES.md](./README_NEW_FEATURES.md)
4. **Understand Architecture** from [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🆘 Troubleshooting

### Common Issues
- **OAuth Redirect URI Mismatch**: Ensure exact match in OAuth settings
- **API Rate Limits**: Implement exponential backoff for retries
- **Posts Not Appearing**: Wait 5-10 minutes for API synchronization

See [API_CONFIGURATION.md](./API_CONFIGURATION.md#troubleshooting) for more solutions.

## 📝 Environment Variables

Create `.env.local` with:

```env
# Google APIs
VITE_GOOGLE_CLIENT_ID=your-client-id
VITE_GOOGLE_CLIENT_SECRET=your-client-secret
VITE_API_KEY=your-gemini-api-key

# Social Platforms
VITE_FACEBOOK_APP_ID=facebook-app-id
VITE_INSTAGRAM_APP_ID=instagram-app-id
VITE_LINKEDIN_CLIENT_ID=linkedin-client-id
VITE_TWITTER_API_KEY=twitter-api-key
```

See [API_CONFIGURATION.md](./API_CONFIGURATION.md) for complete setup.

## 🎓 Learning Path

- **Beginner (30 min)**: Setup, connect GBP, view dashboard
- **Intermediate (1 hour)**: Connect social accounts, create post schedule
- **Advanced (2+ hours)**: Analyze website, optimize, monitor metrics

## 🤝 Contributing

This project is actively maintained. For improvements or features, refer to the documentation structure.

## 📄 License

[Your License Here]

## 🙏 Acknowledgments

- Google for Business Profile and Gemini APIs
- React community for excellent tools
- Tailwind CSS for utility-first styling
- All open-source contributors

## 📞 Support

For help:
1. Check the [documentation](./README_NEW_FEATURES.md)
2. Review [API setup guide](./API_CONFIGURATION.md)
3. See [troubleshooting section](#troubleshooting)
4. Check [QUICK_START.md](./QUICK_START.md) for common tasks

---

<div align="center">

**Built with ❤️ for digital marketing optimization**

[Documentation](./README_NEW_FEATURES.md) • [Quick Start](./QUICK_START.md) • [API Setup](./API_CONFIGURATION.md)

</div>
