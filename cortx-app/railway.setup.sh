#!/usr/bin/env bash
# Helper script to configure Railway variables for this project.
# Usage: edit values below, then run: ./railway.setup.sh

set -e

echo "This script will run Railway CLI commands. Ensure you have the Railway CLI installed and are logged in."
echo "Visit: https://railway.app/ for CLI install instructions."

# Replace placeholders below with real values before running
FRONTEND_URL="https://cort-x-ai.vercel.app"
GOOGLE_REDIRECT_URI="https://cort-x-ai.vercel.app/auth/callback"
GOOGLE_CLIENT_ID="<YOUR_GOOGLE_CLIENT_ID>"
GOOGLE_CLIENT_SECRET="<YOUR_GOOGLE_CLIENT_SECRET>"
JWT_SECRET="<A_STRONG_JWT_SECRET>"
PORT="5000"

echo "Logging into Railway (interactive)..."
railway login || true

echo "If this repo is not linked, run: railway init or railway link <project-id>"

echo "Setting variables on Railway (replace placeholders with real values if not already set)..."
railway variables set FRONTEND_URL "$FRONTEND_URL"
railway variables set GOOGLE_REDIRECT_URI "$GOOGLE_REDIRECT_URI"
railway variables set GOOGLE_CLIENT_ID "$GOOGLE_CLIENT_ID"
railway variables set GOOGLE_CLIENT_SECRET "$GOOGLE_CLIENT_SECRET"
railway variables set JWT_SECRET "$JWT_SECRET"
railway variables set PORT "$PORT"

echo "Variables set. Redeploy with: railway up  (or use the Railway dashboard to redeploy)."
