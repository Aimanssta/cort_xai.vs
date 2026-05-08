import { VercelRequest, VercelResponse } from '@vercel/node'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const APP_URL = process.env.APP_URL || ''

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (!GOOGLE_CLIENT_ID || !APP_URL) return res.status(500).json({ error: 'Server not configured' })
  const redirectUri = `${APP_URL.replace(/\/$/, '')}/api/auth/google_callback`
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/business.manage openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  })
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  return res.redirect(302, url)
}
