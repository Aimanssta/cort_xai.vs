# ============================================================================
# Cort X AI - Git Initialization & Commit Script
# ============================================================================
# This script:
# 1. Initializes a Git repository (if not already done)
# 2. Adds all files
# 3. Creates the initial commit
# 4. Shows instructions for pushing to GitHub
# ============================================================================

$ErrorActionPreference = "Stop"

Write-Host "
╔══════════════════════════════════════════════════════════════╗
║   📦 GIT INITIALIZATION & COMMIT                             ║
║       (PowerShell Script for Windows)                        ║
╚══════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

# ============================================================================
# Check if Git is installed
# ============================================================================

Write-Host "`n📋 Checking Git Installation..." -ForegroundColor Yellow

$gitVersion = & {
    try { git --version 2>$null }
    catch { $null }
}

if ($gitVersion) {
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Git not found. Installing..." -ForegroundColor Red
    try {
        winget install --id Git.Git -e --accept-source-agreements
        Write-Host "✅ Git installed. Please restart PowerShell and run this script again." -ForegroundColor Green
        exit 0
    } catch {
        Write-Host "⚠️  Could not install Git via winget." -ForegroundColor Yellow
        Write-Host "   Download manually from: https://git-scm.com/downloads" -ForegroundColor Yellow
        Write-Host "   Then run this script again." -ForegroundColor Yellow
        exit 1
    }
}

# ============================================================================
# Initialize Git repository (if not already initialized)
# ============================================================================

Write-Host "`n📋 Initializing Git Repository..." -ForegroundColor Yellow

if (Test-Path ".git") {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
} else {
    Write-Host "   Creating new Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

# ============================================================================
# Configure Git (user name and email - optional but recommended)
# ============================================================================

Write-Host "`n📋 Git Configuration (optional)" -ForegroundColor Yellow

$userName = git config user.name
$userEmail = git config user.email

if ($userName -and $userEmail) {
    Write-Host "✅ Git user already configured:" -ForegroundColor Green
    Write-Host "   Name: $userName" -ForegroundColor Green
    Write-Host "   Email: $userEmail" -ForegroundColor Green
} else {
    Write-Host "   Setting up Git user (for commit metadata)..." -ForegroundColor Cyan
    $name = Read-Host "Enter your name (or press Enter for 'Your Name')"
    if ($name -eq "") { $name = "Your Name" }
    
    $email = Read-Host "Enter your email (or press Enter for 'you@example.com')"
    if ($email -eq "") { $email = "you@example.com" }
    
    git config user.name $name
    git config user.email $email
    
    Write-Host "✅ Git configured:" -ForegroundColor Green
    Write-Host "   Name: $name" -ForegroundColor Green
    Write-Host "   Email: $email" -ForegroundColor Green
}

# ============================================================================
# Add all files to staging area
# ============================================================================

Write-Host "`n📋 Staging Files..." -ForegroundColor Yellow

Write-Host "   Adding all files..." -ForegroundColor Cyan
git add .

Write-Host "✅ Files staged for commit" -ForegroundColor Green

# ============================================================================
# Show what will be committed
# ============================================================================

Write-Host "`n📋 Files to be Committed:" -ForegroundColor Yellow
Write-Host "   (Run 'git status' to see any uncommitted changes)" -ForegroundColor Cyan
git status

# ============================================================================
# Create initial commit
# ============================================================================

Write-Host "`n📋 Creating Initial Commit..." -ForegroundColor Yellow

$commitMessage = "feat: Production deployment setup with Vercel/Docker configs, optimized Vite build, and CI/CD pipeline`n`n- Removed Netlify config (netlify.toml)`n- Added Vercel deployment config (vercel.json)`n- Added Docker containerization (Dockerfile, docker-compose.yml)`n- Added GitHub Actions CI/CD workflow`n- Optimized Vite build configuration for production`n- Added comprehensive deployment documentation`n- Configured environment variable management`n- Security headers and caching configured"

Write-Host "   Commit message:" -ForegroundColor Cyan
Write-Host "   $($commitMessage.Split([Environment]::NewLine)[0])" -ForegroundColor Cyan

git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit created successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  Commit encountered an issue (check output above)" -ForegroundColor Yellow
}

# ============================================================================
# Show current branch
# ============================================================================

Write-Host "`n📋 Current Branch:" -ForegroundColor Yellow

$branch = git rev-parse --abbrev-ref HEAD
Write-Host "   $branch" -ForegroundColor Green

# Rename to 'main' if on 'master'
if ($branch -eq "master") {
    Write-Host "   Renaming to 'main'..." -ForegroundColor Cyan
    git branch -M main
    Write-Host "✅ Branch renamed to 'main'" -ForegroundColor Green
}

# ============================================================================
# Final Summary & Next Steps
# ============================================================================

Write-Host "
╔══════════════════════════════════════════════════════════════╗
║   ✅ GIT INITIALIZED & COMMITTED!                           ║
╚══════════════════════════════════════════════════════════════╝

📊 Commit Information:
   Branch: main
   Status: Ready to push to GitHub

🚀 NEXT STEP: Push to GitHub

Choose one method:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD A: Using GitHub CLI (Easiest - if installed)

  gh auth login
  gh repo create cortx-ai --public --source=. --remote=origin --push

  Or for private repository:
  gh repo create cortx-ai --private --source=. --remote=origin --push

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

METHOD B: Manual (Create on GitHub.com first)

  1. Go to: https://github.com/new
  2. Repository name: cortx-ai
  3. Visibility: Public (or Private)
  4. DO NOT initialize with README/License
  5. Click 'Create repository'

  Then run:
  git remote add origin https://github.com/YOUR_USERNAME/cortx-ai.git
  git branch -M main
  git push -u origin main

  Replace YOUR_USERNAME with your GitHub username!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 Troubleshooting:

  • If push fails with 'Permission denied', you may need to:
    - Generate a Personal Access Token (PAT) at:
      https://github.com/settings/tokens
    - Use PAT as password when prompted
    - Or set up SSH: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

  • If remote already exists, remove it first:
    git remote remove origin

  • View current remote:
    git remote -v

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Once pushed to GitHub, you can deploy to Vercel:

  1. Go to: https://vercel.com
  2. Click: 'New Project'
  3. Import your cortx-ai GitHub repository
  4. Click: 'Deploy'
  
  Your app will be live in ~2-3 minutes! 🚀

" -ForegroundColor Cyan

Write-Host "Done! Ready to push to GitHub.`n" -ForegroundColor Green
