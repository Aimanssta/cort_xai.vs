import { VercelRequest, VercelResponse } from '@vercel/node'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || ''
const APP_URL = process.env.APP_URL || ''
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ''
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@example.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ error: 'Missing email' })
  if (!JWT_SECRET || !APP_URL || !SENDGRID_API_KEY) {
    return res.status(500).json({ error: 'Server not configured' })
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' })
  const link = `${APP_URL.replace(/\/$/, '')}/api/auth/verify?token=${token}`

  // Send email via SendGrid
  const body = {
    personalizations: [{ to: [{ email }], subject: 'Your magic login link' }],
    from: { email: EMAIL_FROM },
    content: [{ type: 'text/plain', value: `Sign in: ${link}\nThis link expires in 15 minutes.` }]
  }

  const r = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!r.ok) {
    const text = await r.text()
    return res.status(502).json({ error: 'Failed to send email', detail: text })
  }

  return res.status(200).json({ ok: true })
}
