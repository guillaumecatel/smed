# eslint-config-storybook

Sharable ESLint configuration for Storybook/React projects in the monorepo.

## Overview

This package provides ESLint rules and plugins tailored for Storybook and React projects. It is designed to be combined with the base config (`eslint-config`) and can be used standalone or via the aggregated `eslint-config-all` for full monorepo IDE support.

- **Storybook/React support**: Rules and plugins for Storybook, React, and JSX
- **Combine with base**: Use together with `eslint-config` via spread
- **Monorepo integration**: Included in `eslint-config-all` for global IDE support
- **Workspace integration**: Can be imported directly thanks to pnpm workspaces

## Usage

In your Storybook/React project's `eslint.config.ts`:

```ts
import base from 'eslint-config'
import storybook from 'eslint-config-storybook'

export default [...base, ...storybook]
```

Or, for full monorepo IDE support, use the aggregated config in your root:

```ts
import all from 'eslint-config-all'
export default all
```

## Contributing

- To add or update rules, edit `src/index.ts` in this package.
- Please update the `CHANGELOG.md` with any notable changes.

## License

See [LICENCE.md](./LICENCE.md).
