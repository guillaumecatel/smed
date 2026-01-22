# tailwindcss-config

Shared Tailwind CSS configuration package for the monorepo.

## Overview

This package provides a reusable Tailwind CSS configuration and base styles (`index.css`) for all projects in the monorepo. It is designed to promote consistency, reduce duplication, and simplify Tailwind setup across applications and packages.

- **Base config**: A generic Tailwind CSS config suitable for most projects.
- **Workspace integration**: Can be referenced directly by package name thanks to pnpm workspaces linking it in `node_modules`.
- **Base styles**: Includes a shared `index.css` file with recommended resets and global styles.

## Usage

1. **Install** (already available in the monorepo via workspace):

   No need to install manually if you use the monorepo structure.

2. **Extend the config in your project**:

   In your project's stylesheet:

   ```css
   @import 'tailwindcss-config';
   /* Your custom styles below */
   ```

## Contributing

- To add or update configs or base styles, edit or add the relevant files in this package.
- Please update the `CHANGELOG.md` with any notable changes.

## License

See [LICENCE.md](./LICENCE.md).
