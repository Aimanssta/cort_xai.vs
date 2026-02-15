# 🚀 Deploy to GitHub & Vercel - Step-by-Step Guide

## Part 1: Push to GitHub

### Prerequisites
- GitHub account (create at https://github.com if you don't have one)
- Git installed (✅ already have it)

### Steps

#### 1. Create a New Repository on GitHub

1. Go to https://github.com/new
2. Fill in the form:
   - **Repository name**: `cort-x-ai` (or your preferred name)
   - **Description**: `AI-powered digital marketing optimization platform with GBP integration, daily post automation, and multi-platform social media management`
   - **Visibility**: Public (if you want it open source) or Private
   - **Initialize with**: Leave unchecked (we already have files)

3. Click **Create repository**

4. You'll see a page with commands. Copy your repository URL (looks like: `https://github.com/your-username/cort-x-ai.git`)

#### 2. Add Remote and Push to GitHub

Run these commands in your terminal:

```bash
# Navigate to your project
cd "c:\Users\Hp\Downloads\cort-x-ai (1)"

# Add the remote repository (replace with YOUR GitHub URL)
git remote add origin https://github.com/your-username/cort-x-ai.git

# Rename branch to main (GitHub default)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Result**: Your code is now on GitHub! ✅

---

## Part 2: Deploy to Vercel

### Prerequisites
- Vercel account (create at https://vercel.com if needed - can sign up with GitHub)
- GitHub repository (just created above)

### Steps

#### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Click **Import Git Repository**
4. Select **GitHub** and authorize Vercel to access your account
5. Find and select your `cort-x-ai` repository
6. Configure the project:
   - **Framework**: Vite (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

7. Click **Environment Variables** and add:
   ```
   VITE_GOOGLE_CLIENT_ID=your-value
   VITE_GOOGLE_CLIENT_SECRET=your-value
   VITE_API_KEY=your-value
   VITE_FACEBOOK_APP_ID=your-value
   VITE_INSTAGRAM_APP_ID=your-value
   VITE_LINKEDIN_CLIENT_ID=your-value
   VITE_TWITTER_API_KEY=your-value
   ```

8. Click **Deploy**

**Result**: Your app is live on Vercel! 🚀

#### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
cd "c:\Users\Hp\Downloads\cort-x-ai (1)"
vercel
```

4. Follow the prompts to link your project

---

## What's Next

### ✅ After Deployment

1. **Get Your Live URL**
   - Vercel will give you a URL like: `https://cort-x-ai.vercel.app`
   - Share this with anyone!

2. **Configure Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all your API credentials
   - Redeploy for changes to take effect

3. **Set Up Custom Domain** (Optional)
   - In Vercel Dashboard → Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

4. **Enable Auto-Deploy**
   - By default, every push to GitHub's `main` branch auto-deploys
   - You can customize this in Project Settings

5. **Monitor Deployments**
   - View deployment logs in Vercel Dashboard
   - Check build status and performance

---

## 🔧 Troubleshooting

### Build Fails on Vercel
- Check the build logs in Vercel Dashboard
- Ensure all environment variables are set
- Verify `npm run build` works locally first

### Environment Variables Not Working
- Make sure you added them in Vercel Dashboard (not in .env.local)
- Redeploy after adding variables
- Variables must start with `VITE_` to be exposed to frontend

### 404 on Routes
- Vercel automatically handles Vite routing
- If issues persist, add a `vercel.json` file (already created ✅)

### Domain Issues
- Allow 24-48 hours for DNS propagation
- Check your DNS provider's nameservers

---

## 📊 Key Features Available Live

Once deployed, your platform includes:

✅ **GBP Dashboard** - Real-time metrics
✅ **Post Scheduler** - Automated daily posts
✅ **Social Media Manager** - Facebook, Instagram, LinkedIn, Twitter
✅ **Website Analysis** - SEO & performance audits

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - Already in `.gitignore` ✅
2. **Use Vercel's Environment Variables** for production secrets
3. **Public vs Private Credentials**:
   - `VITE_GOOGLE_CLIENT_ID` - Can be public
   - `VITE_API_KEY` - Keep private on Vercel
   - `VITE_*_CLIENT_SECRET` - Keep private on Vercel

---

## 📝 Useful Commands

```bash
# Check Git status
git status

# Push changes to GitHub
git add .
git commit -m "Your message"
git push

# View deployment status
vercel --prod

# Redeploy from CLI
vercel --prod

# Open your deployment
vercel --prod --open
```

---

## ✨ You're All Set!

Your app is now:
- ✅ In GitHub (version control)
- ✅ On Vercel (live on the internet)
- ✅ Auto-deploys on every GitHub push
- ✅ Accessible via your Vercel URL

**Share your live URL with anyone to showcase your platform!**

---

<div align="center">

**GitHub** → **Vercel** → **Live!** 🚀

Questions? Check [API_CONFIGURATION.md](./API_CONFIGURATION.md) for API setup

</div>
