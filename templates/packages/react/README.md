# template-package-react

> A ready-to-use React + TypeScript package template for monorepos, including strict type utilities, reusable hooks/components, and modern test setup.

## Features

- Modern TypeScript configuration with path aliases and React JSX support
- Ready for publishing and local development
- Vitest for type and runtime tests (including React components)
- Tsdown for type-safe builds (CJS/ESM)
- Example React components and hooks (Button, useCounter)

## Usage

This package is designed to be installed via the CLI in the future, as a starting point for new React + TypeScript packages in your monorepo (in `packages/`).

### Example: React Component

```tsx
import { Button } from 'template-package-react'

export function App() {
  return <Button>Click me</Button>
}
```

### Example: React Hook

```tsx
import { useCounter } from 'template-package-react'

function Counter() {
  const [count, increment] = useCounter()
  return <button onClick={increment}>{count}</button>
}
```

## Project Structure

- `src/` — React components, hooks, type aliases, and guards
- `tests/` — Vitest tests for components, hooks, and types
- `tsconfig.json` — Strict TypeScript config with React JSX support and path aliases
- `tsdown.config.ts` — Build config for CJS/ESM outputs
- `vitest.config.ts` — Test config with typechecking and React support

## Development

Install dependencies (from monorepo root):

```sh
pnpm install
```

Type check:

```sh
pnpm typecheck
```

Run tests:

```sh
pnpm test
```

Build package:

```sh
pnpm build
```

Clean artifacts:

```sh
pnpm clean
```

## License

See [LICENCE.md](LICENCE.md).
