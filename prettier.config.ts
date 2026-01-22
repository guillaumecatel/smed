import { type Config } from 'prettier'

export default {
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  quoteProps: 'consistent',
  singleAttributePerLine: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  bracketSameLine: true,
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-sh',
    'prettier-plugin-tailwindcss',
  ],
} as Config
