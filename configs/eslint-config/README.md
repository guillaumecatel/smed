# eslint-config

Shared base ESLint configuration for the monorepo.

## Overview

This package provides a reusable, opinionated base ESLint config for all JavaScript/TypeScript projects in the monorepo. It is designed to promote code quality, consistency, and best practices across all packages and apps.

- **Base config**: Recommended rules for JavaScript and TypeScript
- **Extensible**: Can be combined with other configs (React, Astro, etc.) via spread
- **Workspace integration**: Can be imported directly thanks to pnpm workspaces

## Usage

In your `eslint.config.ts`:

```ts
import base from 'eslint-config'

export default base
```

## Contributing

- To add or update rules, edit `src/index.ts` in this package.
- Please update the `CHANGELOG.md` with any notable changes.

## License

See [LICENCE.md](./LICENCE.md).
