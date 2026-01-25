import { paraglideVitePlugin } from '@inlang/paraglide-js'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    react(),
    paraglideVitePlugin({
      project: '../../../project.inlang',
      outdir: './src/i18n',
    }),
  ],
})
