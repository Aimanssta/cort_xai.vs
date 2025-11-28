// Deployment configuration for various platforms
// Update this based on your target deployment platform

export const deploymentConfig = {
  // Vercel
  vercel: {
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    installCommand: 'npm install'
  },
  
  // Netlify
  netlify: {
    buildCommand: 'npm run build',
    publishDirectory: 'dist',
    functionsDirectory: 'netlify/functions',
  },

  // GitHub Pages
  githubPages: {
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    baseUrl: '/cort-x-ai' // Change to your repo name if needed
  },

  // AWS S3 + CloudFront
  aws: {
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
    s3Bucket: 'your-cortx-ai-bucket'
  }
};
