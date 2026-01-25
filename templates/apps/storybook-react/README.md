# template-app-storybook-react

> A ready-to-use template for building React apps or packages with Storybook, strict TypeScript, modern tests, and i18n support—ideal for monorepos.

## Features

- Preconfigured Storybook for React (CSF, MDX, custom decorators)
- Strict TypeScript with JSX/TSX support and path aliases
- Example components and stories (`Button`, `Welcome`)
- Ready for internationalization (i18n)
- Integration tests (Vitest) and E2E tests (Playwright)
- Clear structure for components, stories, styles, and tests
- Scripts for development, build, test, and clean

## Usage

This template is designed to be used as a starting point for new React projects in a monorepo.

### Example: React Component

```tsx
import { Button } from '@myorg/ui'

export function App() {
  return <Button>Click</Button>
}
```

### Example: Storybook

Start Storybook in development mode:

```sh
pnpm dev
```

## Scripts

- `pnpm dev` — Start Storybook in development mode
- `pnpm build` — Build Storybook as static files
- `pnpm test` — Run all tests (Vitest + Playwright)
- `pnpm test:integration` — Run integration tests (Vitest)
- `pnpm test:e2e` — Run E2E tests (Playwright)
- `pnpm typecheck` — Run TypeScript type checking
- `pnpm clean` — Remove build and test artifacts

## Project Structure

- `src/` — React components, stories, types
- `.storybook/` — Storybook config, decorators, global styles
- `public/` — Static assets
- `tests/` — E2E (Playwright) and integration (Vitest) tests

## Testing

- **E2E**: Playwright (`tests/e2e/`)
- **Integration**: Vitest (`tests/integration/`)

## TypeScript

- Strict config, path aliases (`@/` for `src/`)

## License

See [LICENCE.MD](LICENCE.MD).
