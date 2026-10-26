/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Base path is configurable so the same build can serve from the domain root
// (Netlify / Cloudflare Pages, default "/") or a sub-path such as GitHub
// Pages (e.g. "/GT-Orbital-Initiative/ambasat/").
const base = process.env.VITE_BASE_PATH ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    css: false,
  },
})
