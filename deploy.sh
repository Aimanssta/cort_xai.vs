#!/bin/bash

# Cort X AI - Quick Deployment Script
# This script helps you prepare for deployment

echo "🚀 Cort X AI - Deployment Preparation"
echo "======================================"
echo ""

# Check Node.js version
echo "✓ Checking Node.js..."
node_version=$(node -v)
echo "  Node version: $node_version"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✓ Dependencies installed"
echo ""

# Build the project
echo "🔨 Building for production..."
npm run build
echo "✓ Build complete"
echo ""

# Show build size
echo "📊 Build Statistics:"
echo "  Location: ./dist"
du -sh dist/ 2>/dev/null || echo "  (Windows: use 'dir /s dist\' to check size)"
echo ""

echo "✅ Your app is ready to deploy!"
echo ""
echo "Next steps:"
echo "1. Test locally:        npm run preview"
echo "2. Choose a platform:   Netlify, Vercel, or Docker"
echo "3. Read:                DEPLOYMENT.md"
echo ""
echo "🎯 Recommended: Use Netlify (easiest)"
echo "   Visit: https://netlify.com"
echo "   Click: New site from Git"
echo "   Connect your GitHub repo"
echo ""
