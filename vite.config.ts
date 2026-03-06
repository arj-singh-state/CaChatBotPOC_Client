import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react()
  ],

  base: 'https://cdn.jsdelivr.net/gh/arj-singh-state/CaChatBotPOC_Client/dist',

  build: {

    rollupOptions: {
      input: {
        app: './src/main.tsx'
      }
    },

    cssCodeSplit: false,
  }
})
