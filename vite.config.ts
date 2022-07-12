import * as path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vitePluginRequire from 'vite-plugin-require'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
