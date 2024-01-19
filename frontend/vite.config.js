import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import CJS2ESM from 'vite-plugin-cjs2esm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

