#!/usr/bin/env powershell

# Cort X AI - GitHub Push Script
# This script automates pushing to GitHub

Write-Host "`n🚀 Cort X AI - GitHub Push Setup`n" -ForegroundColor Cyan

# Check if Git is installed
Write-Host "Checking for Git installation..." -ForegroundColor Yellow
$gitPath = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitPath) {
    Write-Host "`n❌ Git is not installed." -ForegroundColor Red
    # Attempt automatic install via winget (Windows)
    $wingetPath = Get-Command winget -ErrorAction SilentlyContinue
    if ($wingetPath) {
        Write-Host "Attempting to install Git via winget..." -ForegroundColor Yellow
        try {
            winget install --id Git.Git -e --silent | Out-Null
            Start-Sleep -Seconds 2
            $gitPath = Get-Command git -ErrorAction SilentlyContinue
            if ($gitPath) {
                Write-Host "✅ Git installed successfully: $($gitPath.Source)`n" -ForegroundColor Green
            }
            else {
                Write-Host "⚠️ Git installation via winget did not complete. Please install Git manually:" -ForegroundColor Yellow
                Write-Host "  https://git-scm.com/download/win`n" -ForegroundColor Cyan
                exit 1
            }
        }
        catch {
            Write-Host "⚠️ Automatic install failed. Install Git manually: https://git-scm.com/download/win`n" -ForegroundColor Yellow
            exit 1
        }
    }
    else {
        Write-Host "Please install Git and re-run this script:" -ForegroundColor Yellow
        Write-Host "  https://git-scm.com/download/win" -ForegroundColor Cyan
        Write-Host "Or install via winget: winget install --id Git.Git -e" -ForegroundColor Cyan
        exit 1
    }
}
else {
    Write-Host "✅ Git is installed: $($gitPath.Source)`n" -ForegroundColor Green
}

# Check if already a git repo
if (Test-Path .git) {
    Write-Host "✅ Git repository already initialized`n" -ForegroundColor Green
} else {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized`n" -ForegroundColor Green
}

# Configure Git (if not already configured)
Write-Host "Checking Git configuration..." -ForegroundColor Yellow
$gitUser = git config --global user.name
$gitEmail = git config --global user.email

if (-not $gitUser) {
    Write-Host "`n⚠️  Git user not configured. Enter your details:" -ForegroundColor Yellow
    $name = Read-Host "Your name"
    $email = Read-Host "Your email"
    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "✅ Git configured`n" -ForegroundColor Green
} else {
    Write-Host "✅ Git configured as: $gitUser <$gitEmail>`n" -ForegroundColor Green
}

# Show git status
Write-Host "📊 Current Status:" -ForegroundColor Cyan
git status

# Ask for confirmation
Write-Host "`n❓ Continue with push to GitHub?" -ForegroundColor Yellow
$confirm = Read-Host "Enter 'yes' to continue"

if ($confirm -ne "yes") {
    Write-Host "❌ Cancelled`n" -ForegroundColor Red
    exit 0
}

# Add files
Write-Host "`n📝 Adding files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added`n" -ForegroundColor Green

# Commit
Write-Host "💾 Creating commit..." -ForegroundColor Yellow
git commit -m "Production-ready: Cort X AI deployment configuration"
Write-Host "✅ Commit created`n" -ForegroundColor Green

# Ask for repository URL
Write-Host "📍 Repository Information:" -ForegroundColor Cyan
$repoUrl = Read-Host "Enter your GitHub repository URL (https://github.com/USERNAME/cort-x-ai.git)"

if (-not $repoUrl) {
    Write-Host "❌ Repository URL required`n" -ForegroundColor Red
    exit 1
}

# Add remote
Write-Host "`n🔗 Adding remote repository..." -ForegroundColor Yellow
git remote add origin $repoUrl 2>$null
git remote set-url origin $repoUrl  # Update if exists
Write-Host "✅ Remote added: $repoUrl`n" -ForegroundColor Green

# Set main branch
Write-Host "🌿 Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Main branch set`n" -ForegroundColor Green

# Push
Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
    Write-Host "`n📊 Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Go to: $repoUrl" -ForegroundColor White
    Write-Host "  2. For Netlify: netlify.com → New site from Git" -ForegroundColor White
    Write-Host "  3. For Vercel: vercel.com → Import Project" -ForegroundColor White
    Write-Host "  4. Select your GitHub repo and deploy!" -ForegroundColor White
} else {
    Write-Host "`n❌ Push failed. Check your credentials." -ForegroundColor Red
    Write-Host "See GITHUB_PUSH_GUIDE.md for troubleshooting`n" -ForegroundColor Yellow
}
