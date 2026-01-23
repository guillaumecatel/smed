# eslint-config-astro

Shared ESLint configuration for Astro projects in the monorepo.

## Overview

This package provides ESLint rules and plugins tailored for Astro projects.

- **Astro support**: Rules and plugins for `.astro` files
- **Combine with base**: Use together with `eslint-config` via spread
- **Workspace integration**: Can be imported directly thanks to pnpm workspaces

## Usage

In your Astro project's `eslint.config.ts`:

```ts
import base from 'eslint-config'
import astro from 'eslint-config-astro'

export default [...base, ...astro]
```

## Contributing

- To add or update rules, edit `src/index.ts` in this package.
- Please update the `CHANGELOG.md` with any notable changes.

## License

See [LICENCE.md](./LICENCE.md).
