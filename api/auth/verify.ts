import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''
const APP_URL = process.env.APP_URL || ''

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query || {}
  if (!token || typeof token !== 'string') return res.status(400).json({ error: 'Missing token' })
  if (!JWT_SECRET || !APP_URL) return res.status(500).json({ error: 'Server not configured' })

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string }
    const sessionToken = jwt.sign({ email: payload.email, type: 'session' }, JWT_SECRET, { expiresIn: '7d' })
    // Redirect back to frontend with session token
    const redirectUrl = `${APP_URL.replace(/\/$/, '')}/?token=${sessionToken}`
    return res.redirect(302, redirectUrl)
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
