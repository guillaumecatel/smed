import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/setup.ts',
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
    coverage: {
      include: ['src/**/*.tsx', 'src/**/*.ts'],
      exclude: ['src/index.ts'],
    },
  },
})
