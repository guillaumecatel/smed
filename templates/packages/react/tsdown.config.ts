import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/**/*.ts', './src/**/*.tsx'],
  format: ['cjs', 'esm'],
  platform: 'neutral',
  ignoreWatch: ['.turbo'],
  dts: true,
})
