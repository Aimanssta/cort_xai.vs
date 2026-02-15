# Quick Start Guide - Cort X AI

## 🎯 What You Can Do Now

Your platform now includes complete functionality for:
- ✅ Connecting to Google Business Profile
- ✅ Viewing real-time GBP statistics
- ✅ Creating automated daily posts
- ✅ Managing multiple social media accounts
- ✅ Analyzing website performance and SEO
- ✅ AI-powered content generation for all platforms

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment Variables
Create `.env.local` in your project root:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
VITE_API_KEY=your-gemini-api-key
```

See `API_CONFIGURATION.md` for detailed setup instructions.

### Step 3: Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📱 Main Features Overview

### 1. GBP Dashboard (Menu: "GBP Dashboard")
**What it shows:**
- Profile views (monthly)
- Phone calls initiated
- Direction requests
- Website visits
- Customer reviews & ratings
- 30-day trend charts

**How to use:**
1. Click "GBP Dashboard" in sidebar
2. View real-time metrics
3. Click "Refresh Stats" for latest data

### 2. Post Scheduler (Menu: "Post Scheduler")
**What it does:**
- Creates AI-generated posts automatically
- Schedules posts for specific times/days
- Supports multiple categories (Promotional, Educational, Engagement, Seasonal)

**How to use:**
1. Click "Post Scheduler" in sidebar
2. Click "New Schedule"
3. Select post category
4. Choose content template or write custom topic
5. Select posting frequency (daily/weekly)
6. Choose which platforms to post to
7. Click "Create Schedule"

**Supported Categories:**
- 🎯 **Promotional**: Offers, discounts, new products
- 📚 **Educational**: Tips, guides, how-tos
- 💬 **Engagement**: Questions, polls, behind-the-scenes
- 🎄 **Seasonal**: Holiday content, seasonal promotions

### 3. Social Media Manager (Menu: "Social Media")
**What it does:**
- Connect Facebook, Instagram, LinkedIn, Twitter accounts
- Post simultaneously to multiple platforms
- Track engagement across platforms

**How to use:**
1. Click "Social Media" in sidebar
2. Click "Connect" on each platform you want to use
3. Authorize account access (OAuth flow)
4. Click "New Post" to create content
5. Write your post
6. Select which platforms to post to
7. Click "Post to [X] Platforms"

**Engagement Metrics:**
- Views per post
- Likes and engagement
- Comments and shares
- Post performance history

### 4. Website Analysis (Menu: "Website Analysis")
**What it analyzes:**
- SEO optimization score
- Mobile responsiveness
- Performance metrics (load time, etc.)
- Accessibility compliance
- Security assessment

**How to use:**
1. Click "Website Analysis" in sidebar
2. Enter your website URL
3. Click "Analyze"
4. Review scores and recommendations
5. Fix critical issues first
6. Track improvements over time

**Metrics Shown:**
- SEO Score: 0-100
- Mobile Score: 0-100
- Desktop Score: 0-100
- Accessibility Score: 0-100
- Best Practices Score: 0-100

### 5. AI Content Generation
**Automatic in:**
- Post Scheduler (generates daily posts)
- Content suggestions based on your business type
- Review replies (generates professional responses)

The AI learns from your content and platform to optimize:
- Tone and style per platform
- Optimal hashtags for Instagram
- Professional language for LinkedIn
- Conciseness for Twitter (280 chars)

## 🔐 First-Time Setup Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Create `.env.local` with API keys
- [ ] Start dev server (`npm run dev`)
- [ ] Set up Google Business Profile API
- [ ] Connect at least one social media account
- [ ] Create first post schedule
- [ ] Analyze website

## 📊 Dashboard Navigation

### Main Sidebar Menu
```
Profile Audit               - Audit GBP profile
├─ GBP Dashboard            - Live stats & metrics
├─ Post Scheduler           - Automated daily posts
├─ Social Media             - Multi-platform posting
└─ Website Analysis         - SEO & performance

Additional Features
├─ Locations               - Manage multiple locations
├─ Content & Posts         - Legacy post management
├─ Performance             - Historical analytics
├─ Keywords                - Keyword research
├─ Reviews                 - Customer reviews
└─ Promotions              - Ad campaigns
```

## 💡 Tips & Best Practices

### For Best Results with AI Content:
1. **Be Specific**: More details in topic = better content
2. **Set Frequency**: Daily posts perform better than sporadic
3. **Mix Categories**: Vary content types for engagement
4. **Schedule Strategically**: Post during peak hours
5. **Monitor Performance**: Check analytics weekly

### Post Schedule Best Practices:
- Post during business hours for B2B
- Post 2-3 times daily for retail
- Schedule posts 1-2 weeks in advance
- Use mix of promotional (30%), educational (40%), engagement (30%)

### Social Media Tips:
- **Instagram**: Use 8-15 relevant hashtags
- **Twitter**: Keep under 280 characters
- **LinkedIn**: Use professional language
- **Facebook**: Encourage comments and shares

### Website Optimization Priority:
1. **Critical Issues First**: Mobile responsiveness, SSL
2. **High Priority**: Meta descriptions, heading structure
3. **Medium Priority**: Image optimization, internal linking
4. **Low Priority**: Schema markup, minor CSS issues

## 🔄 Workflow Example

### Complete Daily Management Flow:
1. **Morning (9 AM)**
   - Check GBP Dashboard for overnight activity
   - Review new reviews and comments
   - Publish scheduled post

2. **Midday (1 PM)**
   - Create new post for afternoon
   - Check social media engagement
   - Reply to customer inquiries

3. **Evening (5 PM)**
   - Schedule posts for next day
   - Review website analytics
   - Plan next week's content

### Weekly Optimization:
- Monday: Create post schedule for the week
- Wednesday: Analyze performance
- Friday: Plan next week's posts
- Sunday: Website analysis & optimization

## 📈 Measuring Success

### Key Metrics to Track:
- **Engagement Rate**: Views / Followers
- **Response Rate**: Replies to posts
- **Website Traffic**: Clicks from profile
- **Review Growth**: New reviews per month
- **Conversion**: Calls / Directions clicked

### Tools Integration:
- Google Analytics: Website traffic
- GBP Dashboard: Profile engagement
- Social Media Insights: Platform metrics
- Search Console: Keyword rankings

## 🆘 Common Issues & Solutions

### OAuth Redirect URI Mismatch
**Error**: "Redirect URI mismatch"
**Solution**: 
- Check your OAuth app settings match exactly
- Ensure no extra slashes or different http/https

### Posts Not Appearing
**Error**: "Post created but not visible"
**Solution**:
- Wait 5-10 minutes for synchronization
- Check platform account is properly connected
- Verify character limits for platform

### Low Website Scores
**Error**: "Mobile score 45/100"
**Solution**:
- Use responsive design
- Optimize images (compress, use WebP)
- Minimize CSS/JS
- Enable caching
- Use CDN for static assets

### API Rate Limit Errors
**Error**: "429 Too Many Requests"
**Solution**:
- Wait before retrying (exponential backoff)
- Space out API calls
- Upgrade API plan if needed

## 📚 Additional Resources

### Documentation
- [`README_NEW_FEATURES.md`](./README_NEW_FEATURES.md) - Detailed features
- [`API_CONFIGURATION.md`](./API_CONFIGURATION.md) - API setup guide
- Google Business Profile API: https://developers.google.com/my-business

### Useful Links
- Google Cloud Console: https://console.cloud.google.com
- Meta Developers: https://developers.facebook.com/
- LinkedIn Developers: https://developer.linkedin.com/
- Twitter Developers: https://developer.twitter.com/
- Google Gemini: https://makersuite.google.com/

## 🎓 Learning Path

### Beginner (30 min)
1. Set up API credentials
2. Connect one business profile
3. Create first post schedule
4. View GBP dashboard

### Intermediate (1 hour)
1. Connect 2+ social media accounts
2. Create 3-4 different post schedules
3. Run website analysis
4. Set up cross-platform posting

### Advanced (2+ hours)
1. Optimize based on analytics
2. Create custom templates
3. Set up comprehensive workflows
4. Monitor and iterate

## 🚀 Next Steps

1. **Complete Setup**
   - [ ] Get all API credentials
   - [ ] Connect Google Business Profile
   - [ ] Connect at least 2 social accounts

2. **Create Content**
   - [ ] Set up first post schedule
   - [ ] Create 5-10 different templates
   - [ ] Schedule 2 weeks of posts

3. **Optimize**
   - [ ] Analyze website
   - [ ] Fix critical issues
   - [ ] Track metrics weekly

4. **Grow**
   - [ ] Add more locations
   - [ ] Expand to more platforms
   - [ ] Analyze competitor strategies

## 💬 Support & Help

For issues or questions:
1. Check documentation files
2. Review API configuration guide
3. Check console for error messages
4. Review service logs

---

**Happy automating! 🚀**
