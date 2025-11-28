# 📤 PUSH TO GITHUB - COMPLETE GUIDE

Your Cort X AI project is ready to push to GitHub! Follow these steps:

---

## ⚡ QUICK START (5 Minutes)

### Prerequisites
- Git installed (download from https://git-scm.com/download/win if needed)
- GitHub account (https://github.com/signup if needed)
- GitHub repository created (or create one now)

### Commands

Open PowerShell and run:

```powershell
cd C:\Users\Hp\Downloads\cort-x-ai

# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Initialize and push
git init
git add .
git commit -m "Initial commit: Production-ready Cort X AI"
git remote add origin https://github.com/YOUR_USERNAME/cort-x-ai.git
git branch -M main
git push -u origin main
```

**Done!** Your code is on GitHub. 🎉

---

## 📋 STEP-BY-STEP GUIDE

### Step 1: Prepare GitHub

#### Option A: Create New Repository (Recommended)

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `cort-x-ai`
   - **Description**: "AI Sales Agents & Lead Generation - Production Ready"
   - **Visibility**: Public (recommended) or Private
   - ✅ Check "Add a README file" (optional)
3. Click **"Create repository"**
4. Copy the repository URL (looks like: `https://github.com/YOUR_USERNAME/cort-x-ai.git`)

#### Option B: Use Existing Repository

- Navigate to your existing GitHub repo
- Copy the repository URL from the green "Code" button

### Step 2: Install Git (If Needed)

**Check if Git is installed:**
```powershell
git --version
```

**If not installed:**
1. Download: https://git-scm.com/download/win
2. Run installer (use default options)
3. Restart PowerShell
4. Verify: `git --version`

### Step 3: Configure Git (First Time Only)

**Check current configuration:**
```powershell
git config --global user.name
git config --global user.email
```

**If not configured, set it:**
```powershell
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

### Step 4: Initialize Repository

Open PowerShell in your project folder:

```powershell
cd C:\Users\Hp\Downloads\cort-x-ai

# Check current status
git status

# If not a git repo, initialize it
git init
```

### Step 5: Add and Commit Files

```powershell
# Add all files (the . means all files)
git add .

# Commit with a message
git commit -m "Initial commit: Production-ready Cort X AI with deployment configuration"

# View your commit
git log --oneline
```

### Step 6: Connect to GitHub

```powershell
# Add remote repository (replace the URL with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/cort-x-ai.git

# Verify remote was added
git remote -v

# Set main branch (required for GitHub)
git branch -M main
```

### Step 7: Push to GitHub

```powershell
# Push your code to GitHub
git push -u origin main
```

**When prompted:**
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (see below)

### Step 8: Verify

Visit your GitHub repository:
```
https://github.com/YOUR_USERNAME/cort-x-ai
```

You should see all your files! ✅

---

## 🔐 AUTHENTICATION SETUP

### Option 1: Personal Access Token (Recommended)

If your password doesn't work:

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token"** → **"Generate new token (classic)"**
3. **Token name**: `git-push`
4. **Expiration**: 90 days (or longer)
5. **Scopes**: Check ✅
   - `repo` (full control of repositories)
   - `workflow` (update GitHub Actions workflows)
6. Click: **"Generate token"**
7. **Copy the token** (you won't see it again!)
8. Use the token as your **password** when Git prompts you

### Option 2: GitHub CLI (Easy)

Install GitHub CLI: https://cli.github.com

Then use:
```powershell
gh auth login
# Follow prompts to authenticate
gh repo create cort-x-ai --source=. --remote=origin --push
```

### Option 3: Use Automated Script

We've created a PowerShell script to automate everything:

```powershell
# Make script executable
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run the script
.\push-to-github.ps1
```

The script will:
- ✅ Check Git installation
- ✅ Initialize repository
- ✅ Configure Git user
- ✅ Add and commit files
- ✅ Ask for GitHub repo URL
- ✅ Push to GitHub
- ✅ Show next steps

---

## 📝 COMMON COMMANDS REFERENCE

### View Status
```powershell
git status                    # Show what's changed
git log --oneline            # Show commit history
git remote -v                # Show remote repositories
```

### Make Changes and Push
```powershell
git add .                    # Stage all changes
git commit -m "message"      # Create commit
git push                     # Push to GitHub
```

### Undo Changes
```powershell
git restore <file>           # Undo changes to a file
git restore --staged <file>  # Unstage a file
git reset HEAD~1             # Undo last commit
```

### View Repository
```powershell
git branch                   # Show branches
git log                      # Show full commit history
```

---

## 🆘 TROUBLESHOOTING

### ❌ "git is not recognized"
**Solution**: Install Git from https://git-scm.com/download/win

### ❌ "fatal: not a git repository"
**Solution**: Run `git init` in your project folder

### ❌ "error: failed to push some refs to 'origin'"
**Solution**: 
```powershell
git pull origin main
git push origin main
```

### ❌ "Authentication failed"
**Solution**: Use Personal Access Token instead of password (see above)

### ❌ "error: remote origin already exists"
**Solution**:
```powershell
git remote remove origin
git remote add origin <new-url>
```

### ❌ "fatal: The remote end hung up unexpectedly"
**Solution**: Try again, or check your internet connection

---

## ✅ CHECKLIST

- [ ] Git installed (`git --version` works)
- [ ] GitHub account created
- [ ] GitHub repository created
- [ ] Git configured with your name and email
- [ ] In correct project folder (`cd C:\Users\Hp\Downloads\cort-x-ai`)
- [ ] Files added (`git add .`)
- [ ] Commit created (`git commit -m "..."`)
- [ ] Remote added (`git remote add origin ...`)
- [ ] Pushed to GitHub (`git push -u origin main`)
- [ ] Repository visible on github.com

---

## 🚀 NEXT STEPS

Once your code is on GitHub:

### Option 1: Deploy with Netlify (Easiest)
1. Go to https://netlify.com
2. Click: **"New site from Git"**
3. Connect your GitHub account
4. Select your `cort-x-ai` repository
5. Build settings auto-detected
6. Click: **"Deploy"**
7. ✅ Your app is live!

### Option 2: Deploy with Vercel (Fastest)
1. Go to https://vercel.com
2. Click: **"New Project"**
3. Click: **"Import Git Repository"**
4. Select your `cort-x-ai` repository
5. Click: **"Deploy"**
6. ✅ Your app is live!

### Option 3: GitHub Actions Auto-Deploy
The repo includes `.github/workflows/deploy.yml` for CI/CD.

Add your secrets:
1. Go to your GitHub repo
2. Settings → Secrets and variables → Actions
3. Create new secrets:
   - `VITE_GEMINI_API_KEY` = your API key
   - `NETLIFY_AUTH_TOKEN` = Netlify token (if using)
   - `NETLIFY_SITE_ID` = Your Netlify site ID

---

## 📚 ADDITIONAL RESOURCES

- **Git Basics**: https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F
- **GitHub Docs**: https://docs.github.com
- **Connecting to GitHub with SSH**: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
- **GitHub CLI**: https://cli.github.com

---

## 🎉 YOU'RE ALL SET!

Your Cort X AI project is ready to:
- ✅ Be version controlled on GitHub
- ✅ Be deployed to Netlify/Vercel
- ✅ Use GitHub Actions for CI/CD
- ✅ Collaborate with others
- ✅ Deploy automatically on every push

**Push now and deploy in 2 minutes!**
