@echo off
REM Cort X AI - Quick Deployment Script (Windows)
REM This script helps you prepare for deployment

echo.
echo 🚀 Cort X AI - Deployment Preparation
echo ======================================
echo.

REM Check Node.js version
echo Checking Node.js...
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo   Node version: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✓ Dependencies installed
echo.

REM Build the project
echo 🔨 Building for production...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    exit /b 1
)
echo ✓ Build complete
echo.

REM Show build size
echo 📊 Build Statistics:
echo   Location: .\dist
for /f "tokens=*" %%i in ('dir /s .\dist 2^>nul ^| find "bytes"') do echo   %%i
echo.

echo ✅ Your app is ready to deploy!
echo.
echo Next steps:
echo 1. Test locally:        npm run preview
echo 2. Choose a platform:   Netlify, Vercel, or Docker
echo 3. Read:                DEPLOYMENT.md
echo.
echo 🎯 Recommended: Use Netlify (easiest)
echo    Visit: https://netlify.com
echo    Click: New site from Git
echo    Connect your GitHub repo
echo.
pause
