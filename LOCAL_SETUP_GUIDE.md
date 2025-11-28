# 🚀 COMPLETE LOCAL SETUP GUIDE

## One-Command Setup (Automated Script)

If you want to run everything at once (recommended), use the PowerShell script I just created:

### On Windows PowerShell:

```powershell
cd "C:\Users\Hp\Downloads\cort-x-ai"

# Run the setup script (you may need to allow script execution first)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\setup-and-deploy.ps1
```

**What this script does:**
1. ✅ Checks/installs Node.js (if needed)
2. ✅ Creates `.env.local` template
3. ✅ Runs `npm install`
4. ✅ Runs TypeScript type-check
5. ✅ Builds production bundle
6. ✅ Starts preview server (optional test)
7. ✅ Initializes git
8. ✅ Commits all changes

---

## Manual Step-by-Step (if you prefer)

### Step 1: Install Node.js (if not already installed)

```powershell
node -v
npm -v
```

If you see version numbers, skip this step. Otherwise:

```powershell
# Install Node.js LTS
winget install --id OpenJS.NodeJS.LTS -e

# Re-open PowerShell and verify
node -v
npm -v
```

### Step 2: Navigate to project folder

```powershell
cd "C:\Users\Hp\Downloads\cort-x-ai"
```

### Step 3: Create `.env.local` (if using Gemini API)

```powershell
# Copy the template
Copy-Item .env.example .env.local

# Edit it (or just leave as-is for now)
# If you have a Gemini API key, add it:
# VITE_GEMINI_API_KEY=your_key_here
```

### Step 4: Install dependencies

```powershell
npm install
```

**Output:** Should see `added X packages` at the end. ✅

### Step 5: Run TypeScript type-check

```powershell
npm run type-check
```

**Expected:** `Built successfully` or list of any type errors to fix.

### Step 6: Build for production

```powershell
npm run build
```

**Output:** Should end with `dist/index.html` and total size info. ✅

### Step 7: Test the production build

```powershell
npm run preview
```

Then open http://localhost:3000 in your browser and test:
- Homepage loads
- Navigation links work
- Routes work (/#/solutions/*, /#/dashboard, /#/contact)
- No console errors

Press `Ctrl+C` to stop the server.

### Step 8: Initialize git

```powershell
git init
git add .
git commit -m "Production deployment: optimize build, add Vercel/Docker configs"
```

---

## Next: Push to GitHub

Once the script/steps complete, push to GitHub:

### Option A: Create repo on GitHub first, then push

1. Go to https://github.com/new
2. Create new repository named `cortx-ai` (public or private)
3. **Do NOT initialize with README** (we already have files)
4. Run:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cortx-ai.git
git push -u origin main
```

### Option B: Use GitHub CLI (if installed)

```powershell
# Login to GitHub
gh auth login

# Create repo and push in one command
gh repo create cortx-ai --public --source=. --remote=origin --push
# or for private:
# gh repo create cortx-ai --private --source=. --remote=origin --push
```

---

## After Pushing to GitHub: Deploy to Vercel

1. Go to https://vercel.com
2. Click **"New Project"**
3. Click **"Import Git Repository"**
4. Select your `cortx-ai` repo
5. Vercel auto-detects Vite and configures everything
6. Click **Deploy**

✅ **Your app is now live!** Vercel will give you a URL like: `https://cortx-ai.vercel.app`

---

## Troubleshooting

### npm install fails
```powershell
npm cache clean --force
npm install
```

### TypeScript errors after npm install
- These are type warnings, not build blockers
- Review the errors and fix if needed
- Or ignore and continue (build will still work)

### Port 3000 already in use
```powershell
# Use different port
npm run preview -- --port 3001
```

### Git commands not recognized
- Install Git from https://git-scm.com/downloads
- Re-open PowerShell

### npm run build fails
- Check `.env.local` (if using Gemini, make sure key is valid)
- Run `npm ci` to clean install
- Delete `node_modules` and `package-lock.json`, then `npm install` again

---

## What Each npm Script Does

```bash
npm run dev       # Start development server (hot reload)
npm run build     # Build for production (creates dist/)
npm run preview   # Test the production build locally
npm run type-check # Run TypeScript type checker
npm run build:analyze # (Optional) Analyze bundle size
```

---

## Final Checklist

- [ ] Node.js installed (`node -v` shows version)
- [ ] Dependencies installed (`npm install` completed)
- [ ] Type-check passed (`npm run type-check` successful)
- [ ] Build succeeds (`npm run build` shows no errors)
- [ ] Preview works (`npm run preview` at localhost:3000)
- [ ] Git initialized (`git init` ran)
- [ ] Changes committed (`git commit` successful)
- [ ] Remote added (`git remote -v` shows origin)
- [ ] Pushed to GitHub (`git push` successful)
- [ ] Vercel deployment started (repo imported to Vercel)

---

**Ready?** Run the PowerShell script or follow the manual steps, then reply here with the output or let me know if you hit any issues!

When complete, reply with: **"Done!"** and I'll verify everything and help with the final Vercel deployment step.
