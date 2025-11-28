# Cort X AI - Deployment Guide

This guide covers how to deploy the Cort X AI application to various platforms.

## Prerequisites

- Node.js 20+ installed
- npm or yarn package manager
- Git (for GitHub-based deployments)

## Local Development

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Edit .env.local and add your VITE_GEMINI_API_KEY

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` (Vite default) or `http://localhost:3000`

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

## Deployment Platforms

### 1. **Netlify** (Recommended - Easiest)

**Option A: Via UI**
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Site Settings:
   - `VITE_GEMINI_API_KEY`: Your Gemini API key

**Option B: Via CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

The `netlify.toml` file is already configured for automatic builds and deployments.

---

### 2. **Vercel**

**Option A: Via UI**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects Next.js and Vite projects
4. Configure environment variables:
   - `VITE_GEMINI_API_KEY`: Your Gemini API key
5. Deploy!

**Option B: Via CLI**
```bash
npm install -g vercel
vercel
```

The `vercel.json` is already configured.

---

### 3. **Docker (Self-hosted / Cloud)**

Build and run the Docker image:

```bash
# Build the image
docker build -t cortx-ai:latest .

# Run locally
docker run -p 3000:3000 -e VITE_GEMINI_API_KEY=your_key_here cortx-ai:latest

# Or use docker-compose
docker-compose up -d
```

Deploy to:
- **AWS ECS / Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Heroku** (via Docker)

---

### 4. **GitHub Pages**

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/cort-x-ai/', // Replace with your repo name
  // ... rest of config
});
```

Then deploy:
```bash
npm run build
# Manually push dist/ folder or use a GitHub Actions workflow
```

---

### 5. **AWS S3 + CloudFront**

```bash
# Build the project
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-cortx-ai-bucket/ --delete

# Create/update CloudFront distribution for caching
```

---

### 6. **Render.com**

1. Connect GitHub repository
2. Select "Static Site"
3. Build Command: `npm run build`
4. Publish Directory: `dist`
5. Add environment variable: `VITE_GEMINI_API_KEY`

---

## Environment Variables

**Required:**
- `VITE_GEMINI_API_KEY` - Your Google Gemini API key

These variables are used at build time, so they must be set before running `npm run build`.

---

## GitHub Actions CI/CD

The `.github/workflows/deploy.yml` file is configured to:
1. Build on every push to `main` branch
2. Upload build artifacts
3. Deploy to Netlify (if configured)

**Setup:**
1. Add GitHub secrets:
   - `VITE_GEMINI_API_KEY`: Your API key
   - `NETLIFY_AUTH_TOKEN`: Netlify auth token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

---

## Performance Optimization

The build includes:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ CSS optimization
- ✅ Image optimization ready

---

## SSL/HTTPS

All recommended platforms (Netlify, Vercel, Render) provide free SSL certificates automatically.

For self-hosted Docker:
- Use Let's Encrypt with Nginx/Apache reverse proxy
- Or use cloud provider's load balancer with SSL

---

## Monitoring & Analytics

Add to `index.html` for production tracking:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

---

## Troubleshooting

**Issue: Build fails with missing dependencies**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue: Environment variables not loading**
- Ensure variables are prefixed with `VITE_` for client-side access
- Rebuild after adding environment variables

**Issue: Routing not working**
- Make sure your deployment platform is configured to serve `index.html` for all routes (SPA fallback)
- This is already configured in `netlify.toml`, `vercel.json`, and `.htaccess` (if needed)

---

## Support

For issues with specific platforms:
- **Netlify**: https://docs.netlify.com
- **Vercel**: https://vercel.com/docs
- **Docker**: https://docs.docker.com
- **Vite**: https://vitejs.dev/guide/static-deploy.html

