import base from 'eslint-config'
import astro from 'eslint-config-astro'
import react from 'eslint-config-react'

/**
 * Complete ESLint configuration for root workspace
 * Includes all configs for IDE support
 *
 * Order matters: Astro LAST to ensure its parser takes precedence for .astro files
 */
export default [...base, ...react, ...astro]
