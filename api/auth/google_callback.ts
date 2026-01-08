import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const APP_URL = process.env.APP_URL || ''
const JWT_SECRET = process.env.JWT_SECRET || ''

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query || {}
  if (!code || typeof code !== 'string') return res.status(400).json({ error: 'Missing code' })
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !APP_URL || !JWT_SECRET) {
    return res.status(500).json({ error: 'Server not configured' })
  }

  const redirectUri = `${APP_URL.replace(/\/$/, '')}/api/auth/google_callback`
  // Exchange code for tokens
  const params = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
  })

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  })

  if (!tokenRes.ok) {
    const text = await tokenRes.text()
    return res.status(502).json({ error: 'Failed to exchange code', detail: text })
  }

  const data = await tokenRes.json()
  // data contains access_token, refresh_token (if granted), id_token, expires_in

  // Create session token that includes Google tokens (encrypted by JWT)
  const session = jwt.sign({ provider: 'google', tokens: data }, JWT_SECRET, { expiresIn: '30d' })
  const redirectUrl = `${APP_URL.replace(/\/$/, '')}/?g_session=${session}`
  return res.redirect(302, redirectUrl)
}
