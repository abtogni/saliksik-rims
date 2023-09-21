import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "localhost:8000/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
})
