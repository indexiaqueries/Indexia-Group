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

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
    viteCompression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    watch: {
      ignored: ['**/.freebuff/**'],
    },
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
            if (id.includes('framer-motion')) return 'framer-motion'
            if (id.includes('lucide-react')) return 'lucide'
            if (id.includes('react-router-dom') || id.includes('@remix-run')) return 'router'
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor'
            return 'vendor'
          }
        },
      },
    },
  },
})
