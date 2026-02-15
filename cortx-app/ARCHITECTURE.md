# Architecture & Data Flow Documentation

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    USER INTERFACE (React)                        │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌─────────────────┐  ┌──────────────────────┐ │
│ │ GBP          │  │ Post            │  │ Social Media         │ │
│ │ Dashboard    │  │ Scheduler       │  │ Manager              │ │
│ └──────────────┘  └─────────────────┘  └──────────────────────┘ │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │              Website Analysis Component                      │ │
│ └──────────────────────────────────────────────────────────────┘ │
└─────────────────┬───────────────────────────────────────┬────────┘
                  │                                       │
┌─────────────────▼───────────────────────────────────────▼────────┐
│                    SERVICE LAYER (TypeScript)                     │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│ │ GBP Auth     │  │ GBP Data     │  │ Post         │            │
│ │ Service      │  │ Service      │  │ Automation   │            │
│ │              │  │              │  │ Service      │            │
│ └──────────────┘  └──────────────┘  └──────────────┘            │
│                                                                   │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│ │ Social Media │  │ Website      │  │ Gemini       │            │
│ │ Service      │  │ Analysis     │  │ Service      │            │
│ │              │  │ Service      │  │              │            │
│ └──────────────┘  └──────────────┘  └──────────────┘            │
└─────────────────┬───────────────────────────────────┬────────────┘
                  │                                   │
┌─────────────────▼───────────────────────────────────▼────────────┐
│                     EXTERNAL APIs                                 │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Google Cloud Platform                                        │ │
│ │  ├─ Google Business Profile API                             │ │
│ │  ├─ Google OAuth 2.0                                        │ │
│ │  └─ Gemini API (AI Content Generation)                     │ │
│ └──────────────────────────────────────────────────────────────┘ │
│                                                                   │
│ ┌──────────────────────────────────────────────────────────────┐ │
│ │ Social Media Platforms                                       │ │
│ │  ├─ Facebook Graph API                                      │ │
│ │  ├─ Instagram Graph API                                     │ │
│ │  ├─ LinkedIn API v2                                         │ │
│ │  └─ Twitter/X API v2                                        │ │
│ └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagrams

### 1. Google Business Profile Authentication Flow

```
User                App              GBP Auth           Google
 │                  │               Service            OAuth
 │──Click Connect─→ │                │                 │
 │                  │──Generate Auth URL──→            │
 │                  │                │                 │
 │                  │◀──Auth URL──────│                │
 │◀──Redirect to OAuth────────────────│                │
 │                  │                │                 │
 │────Grant Access──────────────────────────────────→ │
 │                  │                │                 │
 │                  │◀──Auth Code──────────────────────│
 │                  │                │                 │
 │                  │──Exchange Code─────────────────→ │
 │                  │                │                 │
 │                  │◀──Access Token────────────────────│
 │                  │                │                 │
 │                  │──Store Token───│                 │
 │◀──Success────────│                │                 │
```

### 2. Daily Post Publishing Flow

```
Scheduler          Post Auto        Gemini           GBP
Triggers           Service          AI               API
    │                  │              │               │
    │──Check Schedule───→             │               │
    │                  │              │               │
    │                  │──Generate Content─────→      │
    │                  │              │               │
    │                  │◀──AI Generated Post──────     │
    │                  │              │               │
    │                  │──Format for Platforms        │
    │                  │              │               │
    │                  │──Post to GBP──────────────→   │
    │                  │              │               │
    │                  │◀──Post ID──────────────────   │
    │                  │              │               │
    │                  │──Cross-post to Social─────→ (Facebook, etc.)
    │                  │              │               │
    │◀──Completion─────│              │               │
```

### 3. Social Media Cross-Posting Flow

```
User Creates       Social Media      Platform APIs
Post               Service
  │                  │                    │
  │──Create Post──→  │                    │
  │                  │                    │
  │                  │──Select Platforms  │
  │                  │◀────────────────────│
  │                  │                    │
  │                  │──Format for Facebook──→
  │                  │──Format for Instagram──→
  │                  │──Format for LinkedIn──→
  │                  │──Format for Twitter──→
  │                  │                    │
  │                  │◀──Success────────── │
  │                  │                    │
  │◀──Post Published──│                    │
```

### 4. Website Analysis Flow

```
User Enters URL    Analysis           Service Calls
                   Service
    │                  │                  │
    │──Submit URL───→  │                  │
    │                  │                  │
    │                  │──Fetch Page──→   │
    │                  │                  │
    │                  │◀──HTML Content─── │
    │                  │                  │
    │                  │──Analyze SEO      │
    │                  │──Check Mobile     │
    │                  │──Test Performance │
    │                  │--Check A11y       │
    │                  │                  │
    │                  │──Parse Issues     │
    │                  │──Score Metrics    │
    │                  │                  │
    │◀──Results────────│                  │
```

## 🔗 Service Interactions

### GBPAuthService
```
Purpose: OAuth 2.0 authentication for Google
├─ initGBPAuth() → Create service instance
├─ getAuthorizationUrl() → Generate login URL
├─ exchangeCodeForToken() → Get access token
├─ refreshAccessToken() → Refresh expired token
├─ getValidAccessToken() → Get current valid token
├─ isAuthenticated() → Check auth status
└─ logout() → Clear credentials
```

### GBPDataService
```
Purpose: Fetch and manage GBP data
├─ getBusinessProfile() → Profile info
├─ getInsights() → Monthly statistics
├─ getPosts() → List GBP posts
├─ createPost() → Publish new post
├─ getReviews() → Customer reviews
├─ replyToReview() → Respond to review
└─ getLocations() → Multi-location support
```

### PostAutomationService
```
Purpose: Schedule and automate posts
├─ createScheduleTemplate() → Create schedule
├─ getScheduleTemplates() → List schedules
├─ updateScheduleTemplate() → Edit schedule
├─ deleteScheduleTemplate() → Remove schedule
├─ generateAndPublishPost() → Immediate post
├─ schedulePost() → Schedule for later
└─ getPostTopicSuggestions() → Content ideas
```

### SocialMediaService
```
Purpose: Manage social media accounts
├─ connectAccount() → Add account
├─ disconnectAccount() → Remove account
├─ getConnectedAccounts() → List accounts
├─ postToSocialMedia() → Post to one platform
├─ crossPost() → Post to multiple platforms
├─ refreshAccessToken() → Update credentials
└─ getOAuthUrl() → Get login URL
```

### WebsiteAnalysisService
```
Purpose: Analyze website performance
├─ analyzeWebsite() → Full audit
├─ getPerformanceMetrics() → Speed & scores
├─ checkSEO() → SEO issues
├─ checkAccessibility() → A11y issues
├─ checkSecurity() → Security issues
├─ getOptimizationRecommendations() → Suggestions
└─ getTechnicalSEOChecklist() → Full checklist
```

### GeminiService (Existing)
```
Purpose: AI content generation
├─ generateProfileSuggestions() → Profile tips
├─ generateReviewReply() → Auto reply
├─ generateMarketingPost() → Content creation
└─ discoverKeywords() → Keyword research
```

## 💾 Data Models

### Core Types (from types.ts)

```typescript
// GBP Statistics
GBPStats {
  viewsLastMonth: number
  callsLastMonth: number
  directionsLastMonth: number
  websiteVisitsLastMonth: number
  messagesSent: number
  reviewsTotal: number
  averageRating: number
  dayTrendData: [{date, views, calls, directions}]
}

// Automated Post
AutomatedPost {
  id: string
  businessProfileId: string
  contentTemplate: string
  scheduledTime: ISO8601
  status: 'scheduled' | 'published' | 'failed'
  platforms: SocialPlatform[]
  generatedContent: string
  mediaUrls: string[]
  createdAt: ISO8601
  publishedAt?: ISO8601
}

// Schedule Template
PostScheduleTemplate {
  id: string
  name: string
  contentTemplate: string
  frequency: 'daily' | 'weekly' | 'custom'
  dayOfWeek?: 0-6
  timeOfDay?: 'HH:mm'
  platforms: SocialPlatform[]
  category: string
  active: boolean
}

// Social Media Account
SocialMediaAccount {
  id: string
  businessProfileId: string
  platform: SocialPlatform
  accountName: string
  accountId: string
  accessToken: string
  refreshToken?: string
  expiresAt?: ISO8601
  connected: boolean
  followers?: number
  lastSync?: ISO8601
}

// Website Metrics
WebsiteMetrics {
  url: string
  loadTimeMs: number
  mobileScore: 0-100
  desktopScore: 0-100
  seoScore: 0-100
  accessibilityScore: 0-100
  bestPracticesScore: 0-100
  issues: WebsiteIssue[]
  lastAnalyzed: ISO8601
}
```

## 🔄 State Management

### Local Storage Persistence
```typescript
// GBP Auth
localStorage.gbp_auth_token → Access token
localStorage.gbp_auth_token_expires → Expiration
localStorage.gbp_refresh_token → Refresh token

// Post Schedules
localStorage.post_schedules → PostScheduleTemplate[]

// Social Accounts
localStorage.social_media_accounts → SocialMediaAccount[]

// Scheduled Posts
localStorage.scheduled_posts → AutomatedPost[]
```

### React State (App.tsx)
```typescript
currentView: ViewState          // Active page
profiles: BusinessProfile[]     // All profiles
activeProfileId: string         // Selected profile
isConnectModalOpen: boolean     // Modal visibility
schedules: PostScheduleTemplate[] // Active schedules
accounts: SocialMediaAccount[]  // Connected accounts
```

## 🚀 Execution Flow

### 1. Application Startup
```
1. React renders App.tsx
2. Load profiles from state
3. Check for stored auth tokens
4. Initialize services
5. Load UI with default profile
6. Listen for user interactions
```

### 2. User Connects Google Profile
```
1. Click "Connect New Profile"
2. Modal opens with OAuth form
3. User enters business details
4. Click "Next: Connect Accounts"
5. User selects social platforms
6. Click "Connect"
7. GBPAuthService.getAuthorizationUrl() generated
8. User redirected to Google OAuth
9. User grants permissions
10. Redirect back with auth code
11. ExchangeCodeForToken() called
12. Profile saved to localStorage
13. Services initialized for new profile
14. Dashboard displays data
```

### 3. User Creates Post Schedule
```
1. Navigate to Post Scheduler
2. Click "New Schedule"
3. Select post category
4. Enter content template or topic
5. Select frequency (daily/weekly)
6. Choose time of day
7. Select platforms
8. Click "Create Schedule"
9. postAutomationService.createScheduleTemplate() called
10. Schedule saved to localStorage
11. Schedule job started
12. At scheduled time:
    a. generateMarketingPost() called for AI content
    b. Content formatted per platform
    c. Posts published via respective APIs
    d. Success logged to localStorage
```

### 4. User Posts to Social Media
```
1. Navigate to Social Media Manager
2. Click "New Post"
3. Write post content
4. Select platforms
5. Click "Post"
6. socialMediaService.crossPost() called
7. For each platform:
    a. Format content (char limits, hashtags, etc.)
    b. Call platform API
    c. Store result (success/failure)
8. Display results to user
9. Store in localStorage for analytics
```

### 5. User Analyzes Website
```
1. Navigate to Website Analysis
2. Enter website URL
3. Click "Analyze"
4. websiteAnalysisService.analyzeWebsite() called
5. Fetch page content
6. Run SEO analysis (meta tags, headings, etc.)
7. Check mobile responsiveness
8. Test page speed
9. Check accessibility (contrast, labels, etc.)
10. Scan for security issues
11. Score each category 0-100
12. Generate recommendations
13. Display results with actionable fixes
```

## 🔐 Security Considerations

### Token Management
- Tokens stored in localStorage (consider moving to secure storage)
- Automatic refresh before expiration
- Token revocation on logout
- HTTPS for all API calls

### API Key Security
- API keys in environment variables
- Never hardcoded in source
- Different keys per environment
- Regular rotation schedule

### Cross-Platform Security
- OAuth 2.0 for all platforms
- Scope limitations per platform
- State parameter for CSRF protection
- Redirect URI validation

### Data Privacy
- User-controlled social account connections
- No storage of sensitive user data
- Compliance with platform ToS
- Audit logging for API calls

## 📈 Performance Optimizations

### Caching Strategy
```
GBP Stats: Cache 1 hour (refresh manually)
Posts: Cache 30 minutes
Schedules: Cached in localStorage
Social Accounts: Cached in localStorage
Website Analysis: Cache 24 hours
```

### API Call Optimization
```
- Batch similar requests
- Debounce rapid calls
- Implement exponential backoff for retries
- Use request timeouts
- Monitor quota usage
```

### UI Performance
```
- Lazy load components
- Memoize expensive calculations
- Virtualize long lists
- Debounce search inputs
- Optimize chart rendering
```

---

This architecture provides a scalable, maintainable system for managing Google Business Profile and social media presence with AI-powered automation.
