import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

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
      middlewareMode: true,
    },
    preview: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: 'terser',
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        output: {
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'charts-vendor': ['recharts'],
            'icons-vendor': ['lucide-react'],
            'utils-vendor': ['react-helmet-async'],
          },
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? '')) {
              return 'images/[name].[hash][extname]';
            } else if (/\.css$/.test(name ?? '')) {
              return 'css/[name].[hash][extname]';
            } else if (/\.woff2?$|ttf|eot/.test(name ?? '')) {
              return 'fonts/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
        },
      },
    },
    plugins: [
      react(),
      mode === 'analyze' ? visualizer({ open: true }) : null,
    ].filter(Boolean),
    // Prefer using import.meta.env in app code; keep NODE_ENV useful for plugins
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    resolve: {
      alias: {
        '@': projectRoot,
      },
    },
    ssr: {
      external: ['pdfkit'],
    },
    optimize: {
      deps: {
        include: [
          'react',
          'react-dom',
          'react-router-dom',
          'lucide-react',
          'recharts',
          'react-helmet-async',
        ],
      },
    },
  };
});
