# Railway setup for cort-x-ai

This file explains how to link and configure the project with Railway and set the required environment variables.

Steps

1. Install Railway CLI: https://railway.app/
2. Login: `railway login`
3. Link this repo to your Railway project: `railway init` or `railway link <project-id>`
4. Edit `railway.setup.sh` to replace placeholders with real values for `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `JWT_SECRET`.
5. Run the helper script: `./railway.setup.sh` (it will set the variables via the CLI).
6. Redeploy: `railway up` or click Redeploy in the Railway dashboard.

Required environment variables

- `FRONTEND_URL` (e.g., https://cort-x-ai.vercel.app)
- `GOOGLE_REDIRECT_URI` (e.g., https://cort-x-ai.vercel.app/auth/callback)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `JWT_SECRET`
- `PORT` (optional, defaults to 5000)

If you run into OAuth errors, verify:

- The `GOOGLE_REDIRECT_URI` in Google Cloud Console matches exactly the value set in Railway.
- Your Google OAuth consent screen has your email as a test user if the app is in testing mode.
- The Business Profile API is enabled for the Google Cloud project.
