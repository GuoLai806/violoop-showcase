import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sites } from '@openai/sites-vite-plugin'

export default defineConfig(({ mode }) => ({
  plugins: [react(), sites()],
  base: mode === 'github' ? '/violoop-showcase/' : '/',
}))
