import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
// Silence 'process' name errors in environments without Node types
declare const process: any;

// In ESM, __dirname isn't defined. Derive project root from import.meta.url
const projectRoot = decodeURI(new URL('.', import.meta.url).pathname);

export default defineConfig(({ mode }) => {
  // loadEnv will read .env, .env.local, .env.[mode] etc.
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_URL || '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'charts-vendor': ['recharts'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
    plugins: [react()],
    // Prefer using import.meta.env in app code; keep NODE_ENV useful for plugins
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    resolve: {
      alias: {
        '@': projectRoot,
      },
    },
  };
});
