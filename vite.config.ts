import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createRequire } from 'node:module'
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
  build: {
    reportCompressedSize: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'framer-motion'
            if (id.includes('react-icons')) return 'react-icons'
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

