import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://cort-x-ai-production.up.railway.app';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
const allowedOrigins = [FRONTEND_URL, 'https://cort-x-ai.vercel.app', 'http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS policy: Origin not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Google OAuth2 Client - Initialize with credentials
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/auth/callback'
);

// Expose a small debug endpoint (non-sensitive) to help verify env configuration
app.get('/debug/env', (req, res) => {
  res.json({
    FRONTEND_URL,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/auth/callback',
    GOOGLE_CLIENT_ID_SET: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET_SET: !!process.env.GOOGLE_CLIENT_SECRET,
    JWT_SECRET_SET: !!process.env.JWT_SECRET,
    PORT: PORT
  });
});

/**
 * POST /auth/google-url
 * Generate Google OAuth login URL
 */
app.post('/auth/google-url', (req, res) => {
  try {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(500).json({ 
        error: 'Missing Google credentials in environment variables',
        hint: 'Ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set'
      });
    }

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/business.manage',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
      ],
    });

    res.json({ authUrl });
  } catch (error) {
    console.error('Auth URL generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /auth/google-callback
 * Exchange authorization code for tokens and fetch user info + businesses
 */
app.post('/auth/google-callback', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code required' });
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const people = google.people({ version: 'v1', auth: oauth2Client });
    const userProfile = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    });

    const email = userProfile.data.emailAddresses?.[0]?.value || 'unknown@example.com';
    const name = userProfile.data.names?.[0]?.displayName || 'User';

    // Get GBP businesses
    const mybusiness = google.mybusiness({
      version: 'v4',
      auth: oauth2Client,
    });

    let businesses = [];
    try {
      const accountsRes = await mybusiness.accounts.list();
      const accounts = accountsRes.data.accounts || [];

      // Fetch locations (businesses) for each account
      for (const account of accounts) {
        try {
          const locationsRes = await mybusiness.accounts.locations.list({
            parent: account.name,
          });

          const locations = locationsRes.data.locations || [];
          businesses = businesses.concat(
            locations.map((loc) => ({
              id: loc.name || `business_${Date.now()}`,
              name: loc.displayName || 'Business',
              type: loc.businessType || 'Local Business',
              location: loc.address?.postalAddress?.addressLines?.[0] || 'Unknown Location',
              color: 'bg-indigo-600',
              initials: (loc.displayName || 'B').substring(0, 2).toUpperCase(),
              isConnected: true,
              lastSync: new Date().toISOString(),
              websiteUrl: loc.websiteUrl || undefined,
              socials: { facebook: false, instagram: false, linkedin: false, twitter: false },
            }))
          );
        } catch (err) {
          console.warn(`Failed to fetch locations for account ${account.name}:`, err.message);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch GBP businesses:', err.message);
      // Continue even if GBP fetch fails—user can still log in
    }

    // Generate JWT token
    const appToken = jwt.sign(
      { email, name, googleTokens: tokens },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token: appToken,
      user: { email, name },
      businesses,
    });
  } catch (error) {
    console.error('Auth callback error:', error);
    // If the underlying error has more details (from Google APIs), log them
    try {
      if (error.response && error.response.data) console.error('OAuth error response:', error.response.data);
      if (error.errors) console.error('Google API errors:', error.errors);
    } catch (e) {
      // ignore
    }
    res.status(500).json({ error: error.message, hint: error.response?.data || error.errors || null });
  }
});

/**
 * POST /businesses/sync
 * Sync user's GBP businesses
 */
app.post('/businesses/sync', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { googleTokens } = decoded;

    oauth2Client.setCredentials(googleTokens);

    const mybusiness = google.mybusiness({
      version: 'v4',
      auth: oauth2Client,
    });

    let businesses = [];
    const accountsRes = await mybusiness.accounts.list();
    const accounts = accountsRes.data.accounts || [];

    for (const account of accounts) {
      try {
        const locationsRes = await mybusiness.accounts.locations.list({
          parent: account.name,
        });

        const locations = locationsRes.data.locations || [];
        businesses = businesses.concat(
          locations.map((loc) => ({
            id: loc.name || `business_${Date.now()}`,
            name: loc.displayName || 'Business',
            type: loc.businessType || 'Local Business',
            location: loc.address?.postalAddress?.addressLines?.[0] || 'Unknown Location',
            color: 'bg-indigo-600',
            initials: (loc.displayName || 'B').substring(0, 2).toUpperCase(),
            isConnected: true,
            lastSync: new Date().toISOString(),
            websiteUrl: loc.websiteUrl || undefined,
            socials: { facebook: false, instagram: false, linkedin: false, twitter: false },
          }))
        );
      } catch (err) {
        console.warn(`Failed to fetch locations for account ${account.name}:`, err.message);
      }
    }

    res.json({ businesses });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(401).json({ error: 'Invalid token or failed to sync' });
  }
});

/**
 * Health check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static frontend (if build artifacts are copied to server/public)
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'public', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send('Not Found');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Ensure these env vars are set:');
  console.log('  - GOOGLE_CLIENT_ID');
  console.log('  - GOOGLE_CLIENT_SECRET');
  console.log('  - GOOGLE_REDIRECT_URI (optional, defaults to http://localhost:5173/auth/callback)');
  console.log(`  - FRONTEND_URL (allowed CORS origin): ${FRONTEND_URL}`);
});
