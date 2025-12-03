import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      // Fix for React 19 compatibility - redirect shims to native React exports
      { find: 'use-sync-external-store/shim/with-selector', replacement: path.resolve(__dirname, './src/shims/use-sync-external-store-with-selector.ts') },
      { find: /^use-sync-external-store\/shim(\/index\.js)?$/, replacement: path.resolve(__dirname, './src/shims/use-sync-external-store-shim.ts') },
    ],
  },
  optimizeDeps: {
    include: ['@monaco-editor/react'],
    exclude: ['@clerk/clerk-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          monaco: ['@monaco-editor/react'],
          clerk: ['@clerk/clerk-react'],
        },
      },
    },
  },
})
