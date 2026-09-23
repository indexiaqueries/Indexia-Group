import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react' 
import tailwindcss from '@tailwindcss/vite'
import { ROUTES, COMPANY_SLUGS, BASE_URL, buildPreviewHtml } from './shared/routeMeta.js'

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
  if (process.env.PORT && process.env.PORT !== '0') return Number(process.env.PORT)
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

// Post-build: emit dist/<route>/index.html for every public route so the
// STATIC deployment (Apache) serves per-page preview tags without any
// server-side rewriting. Uses the same shared route metadata as the Render
// crawler middleware (server/middleware/urlPreviews.js), so the two
// deployments never drift.
function routeHtml(): Plugin {
  return {
    name: 'route-html',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve('dist')
      const templatePath = path.join(distDir, 'index.html')
      if (!existsSync(templatePath)) {
        this.error('route-html: dist/index.html not found')
        return
      }
      const template = readFileSync(templatePath, 'utf8')

      // Company slugs must match what the app registers; fail loudly on drift.
      const companiesSrc = readFileSync('src/data/companies.ts', 'utf8')
      for (const slug of COMPANY_SLUGS) {
        if (!companiesSrc.includes(`slug: "${slug}"`)) {
          this.error(`route-html: slug "${slug}" exists in shared/routeMeta.js but not in src/data/companies.ts — out of sync.`)
          return
        }
      }

      let emitted = 0
      for (const [route, preview] of Object.entries(ROUTES)) {
        // Admin is served by the Express deployment only; skip static admin HTML.
        if (route.startsWith('/admin')) continue
        // Aliased routes (e.g. /finserve -> /finance) emit a tiny redirect shell:
        // Apache serves dist/<route>/index.html directly, so a full copy would
        // advertise duplicate content instead of pointing at the canonical URL.
        const dir = path.join(distDir, route)
        mkdirSync(dir, { recursive: true })
        if (preview.redirect) {
          const redirectUrl = `${BASE_URL}${preview.redirect}`
          const shell = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>Redirecting…</title>\n<link rel="canonical" href="${redirectUrl}">\n<meta name="robots" content="noindex, follow">\n<meta http-equiv="refresh" content="0; url=${redirectUrl}">\n<script>location.replace(${JSON.stringify(redirectUrl)});</script>\n</head>\n<body></body>\n</html>\n`
          writeFileSync(path.join(dir, 'index.html'), shell)
          console.log(`route-html: ${route}/index.html -> redirect ${preview.redirect}`)
          emitted += 1
          continue
        }
        const html = buildPreviewHtml(template, preview, route)
        writeFileSync(path.join(dir, 'index.html'), html)
        emitted += 1
        console.log(`route-html: ${route === '/' ? '/' : route + '/'}index.html`)
      }
      console.log(`route-html: emitted ${emitted} per-route HTML files.`)
    },
  }
}

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
    routeHtml(),
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
        target: `http://127.0.0.1:${SERVER_PORT}`,
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

            if (id.includes('recharts') || id.includes('d3-') || id.includes('victory-vendor')) return 'recharts'
            return 'vendor'
          }
        },
      },
    },
  },
})
