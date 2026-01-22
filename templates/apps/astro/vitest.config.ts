import { getViteConfig } from 'astro/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default getViteConfig({
  plugins: [tsconfigPaths()],
  // @ts-expect-error: Missing types for Vitest config in Astro's getViteConfig
  test: {
    globals: true,
    setupFiles: ['tests/integration/setup.ts'],
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
    coverage: {
      include: ['src/**/*.ts', 'src/**/*.astro'],
    },
  },
})
