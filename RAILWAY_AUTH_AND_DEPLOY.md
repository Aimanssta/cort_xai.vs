Railway deployment & required env vars for email login + Google OAuth

Required environment variables (set in Railway project > Settings > Variables):

- `APP_URL` — your app base URL, e.g. `https://cort-x-ai-production.up.railway.app`
- `JWT_SECRET` — a long random secret for signing JWTs
- `SENDGRID_API_KEY` — SendGrid API key for sending magic links
- `EMAIL_FROM` — from address for magic link emails (e.g. `no-reply@yourdomain.com`)
- `GOOGLE_CLIENT_ID` — OAuth client ID from Google Cloud Console
- `GOOGLE_CLIENT_SECRET` — OAuth client secret from Google Cloud Console

Notes and steps to deploy on Railway:

1. Add these env vars to your Railway project.
2. Ensure the OAuth redirect URI in Google Cloud Console includes:
   - `https://<your-railway-app>/api/auth/google_callback`
3. Build & deploy the repo on Railway (Railway will run `npm run build`).
4. After deployment, visit `https://<your-railway-app>/api/auth/google_start` to start Google OAuth.
5. Use the frontend to POST to `/api/auth/send-magic-link` with JSON `{ "email": "you@example.com" }`.
6. The magic link email will point to `/api/auth/verify?token=...`, which redirects to the app with `?token=` session.

Security and production notes:
- For production, store sessions and OAuth tokens in a secure DB (Postgres on Railway) instead of embedding tokens in JWTs.
- Use HTTPS everywhere and rotate `JWT_SECRET` carefully.
