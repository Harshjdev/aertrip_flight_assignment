import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration.
// `base: './'` keeps asset paths relative so the production build can be
// served from any sub-path. The dev server proxies nothing because the mock
// flights payload is served statically from `/public/data/flights.json`.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
