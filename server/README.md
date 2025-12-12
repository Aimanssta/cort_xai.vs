# Cort X AI Backend

Node.js backend for handling Google OAuth and real Google Business Profile (GBP) integration.

## Setup

### 1. Get Google Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project: `Cort X AI`
3. Enable these APIs:
   - Google My Business API
   - Google+ API
   - People API
4. Create OAuth 2.0 credentials (Desktop / Web application)
5. Set authorized redirect URI: `http://localhost:5173/auth/callback` (for local) and `https://cort-x-ai.vercel.app/auth/callback` (for production)

### 2. Environment Variables
Create a `.env` file in the `server/` directory:

```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/callback
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
```

### 3. Install Dependencies
```bash
cd server
npm install
```

### 4. Run Locally
```bash
npm run dev
```

Server will start on `http://localhost:5000`.

## API Endpoints

### `POST /auth/google-url`
Generate Google OAuth login URL.

**Response:**
```json
{
  "authUrl": "https://accounts.google.com/o/oauth2/v2/auth?..."
}
```

### `POST /auth/google-callback`
Exchange authorization code for tokens and fetch user + businesses.

**Request:**
```json
{
  "code": "4/0AX4XfW..."
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "user@example.com",
    "name": "John Doe"
  },
  "businesses": [
    {
      "id": "accounts/123/locations/456",
      "name": "My Restaurant",
      "type": "Restaurant",
      "location": "123 Main St",
      "isConnected": true,
      "lastSync": "2025-12-12T10:00:00Z"
    }
  ]
}
```

### `POST /businesses/sync`
Sync user's GBP businesses (refresh).

**Request:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "businesses": [...]
}
```

### `GET /health`
Health check.

## Deployment

### Deploy to Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create a new project and connect your GitHub repo
3. Add environment variables (GOOGLE_CLIENT_ID, etc.)
4. Deploy

### Deploy to Render
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect GitHub repo
4. Add environment variables
5. Deploy

### Vercel Function (Alternative)
You can also deploy as a Vercel serverless function by moving `server.js` to `api/auth.js`.

## Notes
- Google My Business API requires business verification. Make sure your Google account has access to at least one verified business.
- Token expires in 7 days. Frontend should refresh before expiry.
- For production, use environment variable secrets in your deployment platform.
