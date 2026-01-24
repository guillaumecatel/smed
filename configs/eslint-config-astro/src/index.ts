import * as parserTs from '@typescript-eslint/parser'
import pluginAstro from 'eslint-plugin-astro'

const GLOB_ASTRO = '**/*.astro'

const astro = [
  // Astro plugin - sets up parser for .astro files with TS support
  ...pluginAstro.configs['flat/recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: parserTs,
        extraFileExtensions: [GLOB_ASTRO],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]

export default astro
