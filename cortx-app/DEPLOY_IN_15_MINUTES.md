# 🚀 DEPLOY IN 15 MINUTES - QUICK START

## You're ready! Here's what to do:

### ✅ ALREADY DONE FOR YOU
- ✅ Git repository initialized locally
- ✅ All files staged and committed
- ✅ Vercel configuration files added
- ✅ Deployment guide created

### 📋 WHAT YOU NEED TO DO

## **Step 1: Create GitHub Repo (5 minutes)**

Go to: https://github.com/new

```
Repository name: cort-x-ai
Description: AI-powered digital marketing optimization platform
Visibility: Public or Private
Initialize with: Leave unchecked

Click: Create repository
```

**→ Copy the repository URL** (something like: `https://github.com/YOUR-USERNAME/cort-x-ai.git`)

---

## **Step 2: Push to GitHub (2 minutes)**

Open PowerShell and run:

```powershell
cd "c:\Users\Hp\Downloads\cort-x-ai (1)"

git remote add origin https://github.com/YOUR-USERNAME/cort-x-ai.git

git branch -M main

git push -u origin main
```

✅ Your code is now on GitHub!

---

## **Step 3: Deploy to Vercel (5 minutes)**

Go to: https://vercel.com/dashboard

```
1. Click "Add New" → "Project"
2. Click "Import Git Repository"
3. Select GitHub
4. Authorize (if needed)
5. Select your "cort-x-ai" repository
6. Click "Import"
7. Framework: Vite (auto-detected)
8. Click "Deploy"
```

⏳ Wait for deployment (usually 1-2 minutes)

✅ Your app is now LIVE!

---

## **Step 4: Add Environment Variables (2 minutes)**

Back in Vercel Dashboard:

```
Settings → Environment Variables

Add these (leave as empty strings if you don't have them yet):
- VITE_GOOGLE_CLIENT_ID
- VITE_GOOGLE_CLIENT_SECRET
- VITE_API_KEY
- VITE_FACEBOOK_APP_ID
- VITE_INSTAGRAM_APP_ID
- VITE_LINKEDIN_CLIENT_ID
- VITE_TWITTER_API_KEY

Then redeploy.
```

---

## **Step 5: Get Your Live URL**

In Vercel Dashboard, look for:
```
https://your-project.vercel.app
```

**This is your live app!** 🎉

Share this URL with anyone to showcase your platform.

---

## 📊 What's Live?

Your deployed app includes:
- ✅ GBP Dashboard
- ✅ Post Scheduler  
- ✅ Social Media Manager
- ✅ Website Analysis
- ✅ All features and documentation

---

## 📝 After Deployment

Whenever you update your code:
```bash
git add .
git commit -m "Your message"
git push
```

Vercel automatically deploys! ✅

---

## ❓ Need Help?

- Detailed steps: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Setup summary: [GITHUB_VERCEL_SETUP.md](./GITHUB_VERCEL_SETUP.md)
- Full platform docs: [00_START_HERE.md](./00_START_HERE.md)

---

<div align="center">

**That's it! You're going live.** 🚀

[Deployment Guide →](./DEPLOYMENT_GUIDE.md)

</div>
