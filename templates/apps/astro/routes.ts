import type { Runtime } from '@inlang/paraglide-js'

export default [
  {
    pattern: '/',
    localized: [
      ['fr', '/fr'],
      ['en', '/'],
    ],
  },
  {
    pattern: '/about',
    localized: [
      ['fr', '/fr/a-propos'],
      ['en', '/about'],
    ],
  },
  {
    pattern: '/cookie-policy',
    localized: [
      ['fr', '/fr/politique-de-cookies'],
      ['en', '/cookie-policy'],
    ],
  },
  {
    pattern: '/privacy-policy',
    localized: [
      ['fr', '/fr/politique-de-confidentialite'],
      ['en', '/privacy-policy'],
    ],
  },
  {
    pattern: '/terms-of-service',
    localized: [
      ['fr', '/fr/conditions-d-utilisation'],
      ['en', '/terms-of-service'],
    ],
  },
  {
    pattern: '/accessibility',
    localized: [
      ['fr', '/fr/accessibilite'],
      ['en', '/accessibility'],
    ],
  },
  {
    pattern: '/manifest.webmanifest',
    localized: [
      ['fr', '/fr/manifest.webmanifest'],
      ['en', '/manifest.webmanifest'],
    ],
  },
  {
    pattern: '/og-dynamic.png',
    localized: [
      ['fr', '/fr/og-dynamic.png'],
      ['en', '/og-dynamic.png'],
    ],
  },
  {
    pattern: '/:path(.*)?',
    localized: [
      ['en', '/:path(.*)?'],
      ['fr', '/fr/:path(.*)?'],
    ],
  },
] as Runtime['urlPatterns']
