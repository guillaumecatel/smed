# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.0.0] - 2026-01-17

### Added

- Initial project structure setup, establishing the monorepo foundation with shared configurations, tooling, and directory organization for scalable SaaS development

- Comprehensive README file introducing the Smed template, its philosophy, design principles, and detailed usage instructions for building production-grade applications

- CHANGELOG file to track and document all notable changes to the project, adhering to the Keep a Changelog format for better version management and transparency

- Commitlint setup with conventional commits configuration to enforce standardized commit messages and improve project maintainability

- Husky setup for Git hooks to automate pre-commit and commit-msg validations, enhancing code quality and commit standards

- Pnpm workspace configuration with pnpm-workspace.yaml, lockfile settings, and package.json scripts to enforce pnpm usage, manage monorepo dependencies, and ensure consistent package management

- Syncpack configuration for synchronizing package versions and dependencies across the monorepo to maintain consistency and avoid version mismatches

- Prettier configuration with custom rules, ignore file, VS Code integration, and scripts for formatting and checking code style across the monorepo

- Created shared package `typescript-config` to provide reusable TypeScript configuration files (tsconfig) for the monorepo, starting with a base config and designed to support future configs for React, Next.js, Astro, etc.

- Created template package `react` for reusable React + TypeScript components and hooks

- Created app template `astro` for modern Astro applications with i18n, SEO, PWA, and dynamic OpenGraph support

- Added shared TailwindCSS configuration package for consistent styling and base CSS across the monorepo

- Added shared ESLint configuration packages: base, React, Astro, and all-in-one aggregator for consistent linting and IDE support

- Added Turborepo configuration to the monorepo for efficient task orchestration, caching, and improved developer experience across all packages and apps

- Added `lint-staged` to improve pre-commit code quality checks.

### Changed

### Deprecated

### Fixed

### Removed

### Security

[v0.0.0]: https://github.com/guillaumecatel/smed/compare/v0.0.0...HEAD
