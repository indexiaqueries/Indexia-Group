import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const require = createRequire(import.meta.url)
const viteCompression = require('vite-plugin-compression') as (
  options?: {
    verbose?: boolean
    threshold?: number
    filter?: RegExp | ((file: string) => boolean)
    disable?: boolean
    algorithm?: 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'
    ext?: string
    compressionOptions?: Record<string, unknown>
    deleteOriginFile?: boolean
    success?: () => void
  },
) => Plugin

function readServerPort(): number {
  if (process.env.PORT) return Number(process.env.PORT)
  const envPath = fileURLToPath(new URL('./server/.env', import.meta.url))
  try {
    const env = readFileSync(envPath, 'utf8')
    const match = env.match(/^\s*PORT\s*=\s*(\d+)\s*$/m)
    if (match) return Number(match[1])
    return 3001
  } catch {
    return 3001
  }
}

const SERVER_PORT = readServerPort()

// Makes CSS links non-render-blocking so they load in parallel with JS.
// Adds <noscript> fallback for users without JavaScript.
function nonBlockingCss(): Plugin {
  return {
    name: 'non-blocking-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Replace top-level <link rel="stylesheet"> with preload + onload pattern.
      // Skip anything inside <noscript> blocks.
      const noscriptParts: string[] = [];
      let processed = html.replace(/<noscript>([\s\S]*?)<\/noscript>/gi, (_, content) => {
        noscriptParts.push(content);
        return `<NOSCRIPT_PLACEHOLDER_${noscriptParts.length - 1}>`;
      });
      processed = processed.replace(
        /<link\s+rel="stylesheet"\s+([^>]*href="[^"]+"[^>]*)>/g,
        (_, attrs) => {
          const hrefMatch = attrs.match(/href="([^"]+)"/);
          if (!hrefMatch) return `<link rel="stylesheet" ${attrs}>`;
          const href = hrefMatch[1];
          const extra = attrs.replace(/href="[^"]+"/, '').trim();
          const crossorigin = extra ? ` ${extra}` : '';
          return `<link rel="preload" href="${href}" as="style"${crossorigin} onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="${href}"${crossorigin} /></noscript>`;
        },
      );
      // Restore noscript blocks
      processed = processed.replace(/<NOSCRIPT_PLACEHOLDER_(\d+)>/g, (_, i) => `<noscript>${noscriptParts[Number(i)]}</noscript>`);
      return processed;
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nonBlockingCss(),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    reportCompressedSize: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'lucide'
            if (id.includes('react-router-dom') || id.includes('@remix-run')) return 'router'
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor'
            if (id.includes('cobe')) return 'cobe'
            if (id.includes('i18next') || id.includes('react-i18next')) return 'i18n'
            if (id.includes('express') || id.includes('mongoose') || id.includes('cors') || id.includes('multer')) return 'server-deps'
            return 'vendor'
          }
        },
      },
    },
  },
})
