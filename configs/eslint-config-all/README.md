# eslint-config-all

Shared ESLint configuration for complete monorepo IDE support.

## Overview

This package provides a full ESLint configuration intended for use at the root of the monorepo. It aggregates all relevant configs (base, React, Astro, etc.) to ensure that IDEs (like VS Code) have access to all rules, plugins, and parser settings for every file type in the workspace.

- **Complete config**: Includes all configs for JavaScript, TypeScript, React, and Astro
- **IDE support**: Ensures full linting and IntelliSense in editors
- **Order matters**: Astro config is last to ensure its parser takes precedence for `.astro` files
- **Workspace integration**: Can be imported directly thanks to pnpm workspaces

## Usage

In your monorepo root `eslint.config.ts`:

```ts
import all from 'eslint-config-all'

export default all
```

This ensures that your IDE (e.g. VS Code) will recognize all rules and plugins for every file type in the monorepo, even if individual projects use more granular configs.

## Contributing

- To add or update rules, edit `src/index.ts` in this package.
- Please update the `CHANGELOG.md` with any notable changes.

## License

See [LICENCE.md](./LICENCE.md).
