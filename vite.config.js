import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Probabilitet/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          visuals: ['framer-motion', 'lucide-react'],
          charts: ['recharts'],
        },
      },
    },
  },
})
