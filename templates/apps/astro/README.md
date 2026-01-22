# template-app-astro

> A modern Astro app template for monorepos, featuring i18n, strict TypeScript, E2E/integration tests, and Tailwind CSS.

## Features

- Astro 5+ with Node standalone server output
- Tailwind CSS integration
- Paraglide for i18n (multi-strategy)
- Playform for server-side compression
- Strict TypeScript config with path aliases and Astro types
- E2E tests with Playwright
- Integration tests with Vitest
- Dynamic OpenGraph image endpoint with Satori (see `src/pages/og-dynamic.png.ts`)
- SEO-friendly: robots.txt, sitemap.xml
- PWA-ready: i18n webmanifest
- Clean, modular structure for components, layouts, middleware, and pages

## Scripts

- `pnpm dev` — Start Astro in development mode
- `pnpm build` — Build the app for production
- `pnpm start` — Run the built app (Node standalone)
- `pnpm test` — Run all tests (integration + E2E)
- `pnpm test:integration` — Run Vitest integration tests
- `pnpm test:e2e` — Run Playwright E2E tests
- `pnpm typecheck` — Run Astro type checking
- `pnpm clean` — Remove build, test, and cache artifacts

## Project Structure

- `src/` — Source code (components, layouts, pages, i18n, middleware, styles, types)
- `public/` — Static assets
- `tests/` — E2E and integration tests
- `.astro/` — Astro-generated assets and types
- `coverage/`, `playwright-report/`, `test-results/` — Test outputs

## Testing

- **E2E**: Playwright tests in `tests/e2e/` (see `playwright.config.ts`)
- **Integration**: Vitest tests in `tests/integration/` (see `vitest.config.ts`)

## TypeScript

- Strict config, path aliases (`@/` for `src/`, `~/` for root)
- Astro types included

## i18n

- Paraglide plugin for multi-strategy internationalization
- Configurable via `astro.config.ts`

## License

See [LICENCE.MD](LICENCE.MD).
