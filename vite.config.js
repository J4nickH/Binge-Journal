import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/<Binge-Journal>/', // <--- Replace with your exact GitHub repository name (e.g., '/binge-journal/')
});