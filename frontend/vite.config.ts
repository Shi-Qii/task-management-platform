import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  // [AI assisted - frontend.md #1] vite-plugin-vuetify 負責元件自動載入與樣式 tree-shaking
  plugins: [vue(), vuetify({ autoImport: true })],
  server: { port: 5173 },
})
