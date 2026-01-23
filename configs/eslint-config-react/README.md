# eslint-config-react

Shared ESLint configuration for React projects in the monorepo.

## Overview

This package provides ESLint rules and plugins tailored for React projects. It is designed to be combined with the base config (`eslint-config`) for full coverage.

- **React support**: Rules and plugins for React and JSX
- **Combine with base**: Use together with `eslint-config` via spread
- **Workspace integration**: Can be imported directly thanks to pnpm workspaces

## Usage

In your React project's `eslint.config.ts`:

```ts
import base from 'eslint-config'
import react from 'eslint-config-react'

export default [...base, ...react]
```

## Contributing

- To add or update rules, edit `src/index.ts` in this package.
- Please update the `CHANGELOG.md` with any notable changes.

## License

See [LICENCE.md](./LICENCE.md).
