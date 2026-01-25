import { mergeConfig } from 'vitest/config'

import config from './vite.config'

export default mergeConfig(config, {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'tests/integration/setup.ts',
    include: ['tests/integration/**/*.test.{ts,tsx}'],
    typecheck: {
      tsconfig: 'tsconfig.test.json',
    },
    coverage: {
      include: ['{.storybook,src}/**/*.{ts,tsx}'],
    },
  },
})
