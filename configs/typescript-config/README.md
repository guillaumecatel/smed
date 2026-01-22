# typescript-config

Shared TypeScript configuration package for the monorepo.

## Overview

This package provides reusable TypeScript configuration files (`tsconfig.json`) for all projects in the monorepo. It is designed to promote consistency, reduce duplication, and simplify TypeScript setup across applications and packages.

- **Base config**: A generic `tsconfig` suitable for most TypeScript projects.
- **Extensible**: Future configs will be added for React, Next.js, Astro, and other frameworks.
- **Workspace integration**: Can be referenced directly by package name thanks to pnpm workspaces linking it in `node_modules`.

## Usage

1. **Install** (already available in the monorepo via workspace):

   No need to install manually if you use the monorepo structure.

2. **Extend the config in your project**:

   In your project's `tsconfig.json`:

   ```json
   {
     "extends": "typescript-config/base",
     "compilerOptions": {
       // Project-specific overrides
     }
   }
   ```

3. **Other configs**

   As the monorepo evolves, additional configs (e.g., `react.json`, `next.json`, `astro.json`) are provided in this package. You be able to extend them in the same way:

   ```json
   {
     "extends": "typescript-config/astro"
   }
   ```

## Contributing

- To add or update configs, edit or add the relevant `.json` files in this package.
- Please update the `CHANGELOG.md` with any notable changes.

## License

See [LICENCE.md](./LICENCE.md).
