# template-package-typescript

> A ready-to-use TypeScript package template for monorepos, including strict type utilities, runtime guards, and modern test setup.

## Features

- Strict and reusable type aliases (Nullable, Maybe, Falsy, Primitive, Nullish)
- Runtime type guards for safe value checking
- Modern TypeScript configuration with path aliases
- Ready for publishing and local development
- Vitest for type and runtime tests
- Tsdown for type-safe builds (CJS/ESM)

## Usage

This package is designed to be installed via the CLI in the future, as a starting point for new TypeScript packages in your monorepo (in `packages/`).

### Example: Type Guards

```ts
import { isString, isNumber } from 'template-package-typescript'

if (isString(value)) {
  // value is string
}
```

### Example: Type Aliases

```ts
import type { Nullable, Maybe } from 'template-package-typescript'

type User = {
  name: string
  email: Maybe<string>
  phone: Nullable<string>
}
```

## Project Structure

- `src/` — Type aliases and runtime guards
- `tests/` — Vitest tests for types and guards
- `tsconfig.json` — Strict TypeScript config with path aliases
- `tsdown.config.ts` — Build config for CJS/ESM outputs
- `vitest.config.ts` — Test config with typechecking

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
