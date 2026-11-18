import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // the site is served from https://<user>.github.io/movie-search-app/
  base: '/movie-search-app/',
})
