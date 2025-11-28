# How to Push Your Cort X AI Project to GitHub

Follow these steps to push your project to GitHub:

## Step 1: Install Git (if not already installed)

Download Git from: https://git-scm.com/download/win

Run the installer and follow the default options.

## Step 2: Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `cort-x-ai` (or your preferred name)
   - **Description**: "AI Sales Agents & Lead Generation Platform"
   - **Public** (recommended) or Private (your choice)
   - Check: "Add a README file" (optional)
3. Click "Create repository"
4. You'll see a page with commands to push your code

## Step 3: Configure Git (First Time Only)

Run these commands in PowerShell:

```powershell
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Initialize and Push

In PowerShell, navigate to your project folder and run:

```powershell
cd C:\Users\Hp\Downloads\cort-x-ai

# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Production-ready Cort X AI deployment configuration"

# Add remote repository (replace USERNAME/REPO with your GitHub repo)
git remote add origin https://github.com/YOUR_USERNAME/cort-x-ai.git

# Set default branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Enter Your Credentials

When prompted:
- Username: Your GitHub username
- Password: Your GitHub personal access token (or use GitHub CLI)

### Creating a Personal Access Token

If password doesn't work, create a token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes: `repo`, `workflow`
4. Generate and copy the token
5. Use the token as your password when pushing

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```powershell
# Login to GitHub
gh auth login

# Then use this simpler command:
gh repo create cort-x-ai --source=. --remote=origin --push
```

## Step 6: Verify

Go to your GitHub repository URL:
```
https://github.com/YOUR_USERNAME/cort-x-ai
```

You should see all your files pushed!

## Next: Enable Auto-Deploy

Once your repo is on GitHub, you can:

1. **For Netlify**:
   - Go to netlify.com
   - Click "New site from Git"
   - Connect your GitHub repo
   - Done! Auto-deploys on every push

2. **For Vercel**:
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repo
   - Done! Auto-deploys on every push

3. **For GitHub Actions** (Auto-test & deploy):
   - Already configured in `.github/workflows/deploy.yml`
   - Add your secrets:
     - `VITE_GEMINI_API_KEY` = your API key
     - `NETLIFY_AUTH_TOKEN` = your Netlify token (if using)
     - `NETLIFY_SITE_ID` = your Netlify site ID

## Common Issues

**"git is not recognized"**
- Install Git from https://git-scm.com/download/win
- Restart your terminal after installation

**"error: failed to push some refs"**
```powershell
# Pull latest changes first
git pull origin main

# Then push again
git push origin main
```

**"fatal: not a git repository"**
- Make sure you ran `git init` in your project folder
- Or: `git clone https://github.com/YOUR_USERNAME/cort-x-ai.git`

**"Authentication failed"**
- Use Personal Access Token instead of password
- See "Creating a Personal Access Token" section above

---

**Questions?** See GitHub Docs: https://docs.github.com/en/get-started/importing-your-project-to-github

Once pushed, you can deploy to Netlify or Vercel with one click!
