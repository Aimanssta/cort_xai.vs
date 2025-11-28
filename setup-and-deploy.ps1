# ============================================================================
# Cort X AI - Complete Setup & Deployment Script (PowerShell)
# ============================================================================
# This script:
# 1. Checks/installs Node.js
# 2. Installs npm dependencies
# 3. Runs TypeScript type-check
# 4. Builds for production
# 5. Initializes git and commits
# ============================================================================

$ErrorActionPreference = "Stop"

Write-Host "
╔══════════════════════════════════════════════════════════════╗
║   🚀 CORT X AI - SETUP & DEPLOYMENT AUTOMATION              ║
║       (PowerShell Script for Windows)                        ║
╚══════════════════════════════════════════════════════════════╝
" -ForegroundColor Cyan

# ============================================================================
# STEP 1: Check/Install Node.js
# ============================================================================

Write-Host "`n📋 STEP 1: Checking Node.js Installation..." -ForegroundColor Yellow

$nodeVersion = & {
    try { node --version 2>$null }
    catch { $null }
}

if ($nodeVersion) {
    Write-Host "✅ Node.js is installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found. Installing LTS version..." -ForegroundColor Red
    try {
        winget install --id OpenJS.NodeJS.LTS -e --accept-source-agreements
        Write-Host "✅ Node.js installed. Please restart PowerShell and run this script again." -ForegroundColor Green
        exit 0
    } catch {
        Write-Host "⚠️  Could not install Node.js via winget." -ForegroundColor Yellow
        Write-Host "   Download manually from: https://nodejs.org/en (LTS version)" -ForegroundColor Yellow
        Write-Host "   Then run this script again." -ForegroundColor Yellow
        exit 1
    }
}

# ============================================================================
# STEP 2: Create .env.local (optional, for Gemini API key)
# ============================================================================

Write-Host "`n📋 STEP 2: Setting Up Environment Variables..." -ForegroundColor Yellow

$envFile = ".env.local"
if (-Not (Test-Path $envFile)) {
    Write-Host "Creating $envFile template..." -ForegroundColor Cyan
    @"
# Gemini API Key (get from https://ai.google.dev/)
# Optional: only needed if using Gemini API features
VITE_GEMINI_API_KEY=your_gemini_api_key_here
"@ | Set-Content $envFile
    Write-Host "✅ Created $envFile" -ForegroundColor Green
    Write-Host "   ⚠️  Edit it and add your API key if needed" -ForegroundColor Yellow
} else {
    Write-Host "✅ $envFile already exists" -ForegroundColor Green
}

# ============================================================================
# STEP 3: Install Dependencies
# ============================================================================

Write-Host "`n📋 STEP 3: Installing Dependencies (this may take 1-2 minutes)..." -ForegroundColor Yellow

npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ npm install failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# ============================================================================
# STEP 4: Run TypeScript Type-Check
# ============================================================================

Write-Host "`n📋 STEP 4: Running TypeScript Type-Check..." -ForegroundColor Yellow

npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  TypeScript type-check found issues (non-fatal)" -ForegroundColor Yellow
    Write-Host "   Review the errors above and fix if needed." -ForegroundColor Yellow
}

# ============================================================================
# STEP 5: Build for Production
# ============================================================================

Write-Host "`n📋 STEP 5: Building for Production..." -ForegroundColor Yellow

npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Production build complete" -ForegroundColor Green

# ============================================================================
# STEP 6: Preview Build (optional)
# ============================================================================

Write-Host "`n📋 STEP 6: Testing Build (Starting Preview Server)..." -ForegroundColor Yellow
Write-Host "   This will start a preview server at http://localhost:3000" -ForegroundColor Cyan
Write-Host "   Press Ctrl+C to stop the preview server" -ForegroundColor Cyan

# Start preview in background
$previewProcess = Start-Process -FilePath "npm" -ArgumentList "run", "preview" -NoNewWindow -PassThru

# Wait a moment for server to start
Start-Sleep -Seconds 3

# Try to open browser
try {
    Start-Process "http://localhost:3000"
    Write-Host "`n✅ Browser opened at http://localhost:3000" -ForegroundColor Green
} catch {
    Write-Host "`n✅ Manual check: Open http://localhost:3000 in your browser" -ForegroundColor Green
}

Write-Host "`n   Preview running. Test the app in your browser." -ForegroundColor Yellow
Write-Host "   When ready, press Ctrl+C in this window to stop and continue." -ForegroundColor Yellow

# Wait for user to stop the preview
$previewProcess | Wait-Process

# ============================================================================
# STEP 7: Initialize Git (if not already initialized)
# ============================================================================

Write-Host "`n📋 STEP 7: Initializing Git Repository..." -ForegroundColor Yellow

if (-Not (Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

# ============================================================================
# STEP 8: Add and Commit
# ============================================================================

Write-Host "`n📋 STEP 8: Committing Changes..." -ForegroundColor Yellow

git add .
git commit -m "Production deployment: optimize build, add Vercel/Docker configs, remove Netlify"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "⚠️  Git commit returned non-zero (may be first commit or no changes)" -ForegroundColor Yellow
}

# ============================================================================
# FINAL SUMMARY
# ============================================================================

Write-Host "
╔══════════════════════════════════════════════════════════════╗
║   ✅ SETUP COMPLETE!                                         ║
╚══════════════════════════════════════════════════════════════╝

🎉 Your app is ready for deployment!

📚 Next Steps:

1️⃣  Push to GitHub:
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/cortx-ai.git
    git push -u origin main
    
    (Replace YOUR_USERNAME with your GitHub username)

2️⃣  Deploy to Vercel (Recommended):
    • Go to https://vercel.com
    • Click 'New Project'
    • Import your GitHub repo
    • Vercel auto-deploys! ✨

3️⃣  Or Deploy via Docker:
    docker build -t cortx-ai:latest .
    docker run -p 3000:3000 cortx-ai:latest

📖 Full documentation:
   - See: DEPLOY_NOW.md (quick start)
   - See: DEPLOYMENT.md (detailed guide)
   - See: README_DEPLOYMENT.md (overview)

💡 Tips:
   • Run 'npm run dev' locally for development
   • Run 'npm run build' to rebuild for production
   • Run 'npm run preview' to test the production build

📞 Troubleshooting:
   • If npm install fails, try: npm cache clean --force
   • Check: https://nodejs.org/en for Node.js setup help

" -ForegroundColor Cyan

Write-Host "✨ Happy deploying! ✨`n" -ForegroundColor Green
