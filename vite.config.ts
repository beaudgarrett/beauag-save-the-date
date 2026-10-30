import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is served from https://beaudgarrett.github.io/beauag-save-the-date/
// If a custom domain is added later, build with BASE_PATH=/ (see README).
const base = process.env.BASE_PATH ?? '/beauag-save-the-date/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: ['es2020', 'safari14'],
    cssCodeSplit: false,
  },
})
