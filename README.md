# Smed 🔨

**Smed *(blacksmith in Danish)* is a production-grade monorepo template forged for building SaaS applications.**

Built from years of production experience, Smed provides an opinionated foundation that balances speed with long-term maintainability. Unlike quick starters that leave you struggling at scale, Smed is designed for multiple apps, shared packages, robust CI/CD, and team collaboration from day one.

*Smed is the result of years spent building, refactoring, and maintaining web applications in production. Its goal is simple: help you build SaaS products with confidence, balancing speed, quality, and architectural clarity from day one.*

![GitHub package.json version](https://img.shields.io/github/package-json/v/guillaumecatel/smed)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D24.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PNPM](https://img.shields.io/badge/PNPM-%3E%3D10.0.0-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Table of Contents

- [Philosophy & Design Principles](#philosophy--design-principles)
- [Quick Start](#quick-start)
- [Distribution & Deployment Model](#distribution--deployment-model)
- [Versioning, Releases & Tags](#versioning-releases--tags)
- [CI as a Contract](#ci-as-a-contract)
- [Architecture Overview](#architecture-overview)
- [Detailed Workflow](#detailed-workflow)
- [What Smed Is / Is Not](#what-smed-is--is-not)

## Philosophy & Design Principles

Smed is built around a clear set of principles derived from real-world SaaS development rather than theoretical best practices. These principles guide both the technical choices and the overall developer experience.

### 1. Production-first, not demo-first
Smed is not a playground or a proof-of-concept template. Every tool, configuration, and convention is chosen with production usage in mind: CI/CD, versioning, deployment, linting, type safety, and long-term maintenance.

### 2. Opinionated, but extensible
Smed makes decisions so you don’t have to start from a blank page. Folder structure, tooling, and conventions are predefined. However, nothing is locked: you can adapt, replace, or eject parts of the system as your needs evolve.

### 3. Monorepo as a product architecture
The monorepo is not just a convenience—it is the core architectural choice. Applications and packages are designed to coexist, share tooling, and evolve together with clear boundaries and explicit dependencies.

### 4. Automation over documentation
Repetitive and error-prone tasks (creating apps, packages, syncing configs, updating workflows) are automated through the `smed` CLI. The goal is to reduce cognitive load and avoid configuration drift.

### 5. Scalability over shortcuts
Smed favors patterns that scale across teams and products: shared configs, strict typing, predictable structure, and explicit ownership. It may feel heavier than a simple starter—but it pays off as the project grows.

### 6. GitHub-native by default
Smed favors GitHub-native registries by default to reduce external dependencies and simplify authentication, auditing, and automation.

Applications are built and distributed as Docker images via the GitHub Container Registry (GHCR), while packages are published to the GitHub npm registry associated with the repository.

### 7. Ejectable by design
Smed is a tool, not a cage. At any point, you can eject Smed and keep a clean, fully functional monorepo without generators, templates, or CLI dependencies.

---

## Quick Start

This section provides a high-level overview of how to get started with Smed. A more detailed walkthrough is available in the next section.

### Requirements

- Node.js >= 24.0.0
- pnpm >= 10.0.0
- Git

### Create a new Smed project

```bash
# Clone the Smed template into a new directory
npx degit https://github.com/guillaumecatel/smed my-smed-project
# Navigate to the new project directory
cd my-smed-project
# Initialize a Git repository
git init
# Use the Node.js version specified in .nvmrc
nvm use
# Install dependencies using pnpm
pnpm install
```

At this point, you have a fully functional Smed monorepo ready to be customized.

### Configure project metadata

Edit the `.smedrc` file to define your organization and repository metadata. This information is used to generate package manifests, workflows, and documentation.

```json
{
  "organization": {
    "scope": "myorganization",
    "name": "<my-organization>",
    "email": "<contact@myorganization.com>"
  } ,
  "repository": {
    "url": "<https://github.com/my-organization/my-repository>",
    "type": "git"
  }
}
```

### Create your first application

```bash
pnpm smed create
```

Select an application template (e.g. `astro-react`), provide a name, and optionally enable deployment. Smed will scaffold the app, register it in the monorepo, and generate the required configuration.

### Create shared packages

Use the same command to create reusable packages (UI, utilities, assets, types, etc.):

```bash
pnpm smed create
```

Packages can be published or kept internal, depending on your needs.

### Install packages into applications

```bash
pnpm smed install
```

This command links existing Smed packages into one or more applications, ensuring consistent dependency management across the monorepo.

### Synchronize configuration

When project metadata changes, you can synchronize all generated files:

```bash
pnpm smed sync
```

This updates `package.json` files, GitHub workflows, Docker stages, and documentation where applicable.

### Eject Smed

If you no longer need Smed’s generators or CLI, you can eject it entirely:

```bash
pnpm smed eject
```

After ejection, your monorepo remains fully functional but becomes completely independent of Smed.

---

## Distribution & Deployment Model

Smed relies on a tag-driven, GitHub-native distribution model.

- **Applications** are built as Docker images and pushed to the GitHub Container Registry (GHCR).
- **Packages** are published to the GitHub npm registry scoped to the repository.

Each app or package has its own generated GitHub Actions workflow, responsible for build, validation, and distribution.

Workflows are triggered by pushing tags following this convention:

```
<app-or-package-name>v<semver>
```

Example:

```
websitev0.1.0
uiv1.2.0
```

This approach keeps releases explicit, isolated, and traceable, while allowing multiple apps and packages to evolve independently within the same repository.

---

## Versioning, Releases & Tags

Smed follows a SemVer-based, tag-driven release strategy.

### Tag-based releases

Each application or package is released by pushing a Git tag using the following format:

```
<name>v<major>.<minor>.<patch>
```

Only the workflow associated with the matching app or package is triggered, ensuring:

- No accidental cross-deployments
- Clear ownership of releases
- Independent versioning across the monorepo

### CI validation pipeline

Before any build or publication occurs, workflows run a shared validation pipeline, including:

- Node.js version resolution from `.nvmrc`
- Dependency installation with pnpm
- Turborepo caching
- Security audit (`pnpm audit`)
- Dependency and file graph validation (`pnpm knip`)
- Linting and formatting checks

This guarantees that every released artifact—application image or package—passes the same baseline quality gate.

### Independent evolution

Because apps and packages are versioned independently:

- UI packages can evolve without redeploying apps
- Backend or CMS services can be released independently
- Multiple products can coexist in the same monorepo without coupling their release cycles

---

## CI as a Contract

In Smed, Continuous Integration is treated as a **contract**, not a convenience.

Every application and package must satisfy the same baseline guarantees before it can be released. This contract ensures that anything published from the repository is:

- Buildable in isolation
- Correctly typed and linted
- Secure at the dependency level
- Free from unused or accidental exports

By enforcing these checks uniformly, Smed prevents configuration drift and avoids the common situation where “some packages are stricter than others”.

CI is not optional, not environment-specific, and not left to individual teams—it is part of the architecture.

---

## Architecture Overview

Below is a simplified view of how Smed structures applications, packages, and delivery flows inside a single repository:

```bash
┌────────────┐        ┌────────────────┐
│  Packages  │◀──────▶│ Applications   │
│ (UI, utils │        │ (Web, CMS,     │
│  types…)   │        │ APIs…)         │
└─────▲──────┘        └───────▲────────┘
      │                       │
      │                       │
      │         Tag push      │
      └─────────vX.Y.Z────────┘
                │
        ┌───────▼────────┐
        │ GitHub Actions │
        │  • Validate    │
        │  • Build       │
        │  • Publish     │
        └───────▼────────┘
                │
      ┌─────────┴──────────┐
      │ Registries         │
      │ • GHCR (apps)      │
      │ • GitHub npm (pkg) │
      └────────────────────┘
```

This architecture allows multiple products, services, and libraries to evolve independently while sharing the same tooling and quality guarantees.

---

## Detailed Workflow

This section describes a typical end-to-end workflow when building and releasing with Smed.

### 1. Initialize the project

- Degit the Smed template
- Initialize Git
- Use Node.js version >= 24.0.0
- Install dependencies using pnpm >= 10.0.0
- Define organization metadata in `.smedrc`

At this stage, the repository already contains shared tooling, CI foundations, and templates.

### 2. Generate applications and packages

Using the `smed` CLI, you generate:

- Applications under `apps/`
- Packages under `packages/`

Each generated unit comes with:

- A standardized folder structure
- Shared linting, formatting, and typing rules
- A dedicated GitHub Actions workflow

### 3. Develop and iterate

During development, Turborepo optimizes task execution across the monorepo, while shared configurations ensure consistent behavior across projects.

### 4. Release

When an app or package is ready to be released:

1. Bump its version
2. Push a Git tag following the naming convention

```
<name>v<semver>
```

Only the matching workflow is triggered.

### 5. Validate, build, publish

The workflow executes the full CI contract:

- Environment setup (Node, pnpm)
- Dependency installation and caching
- Security and consistency checks
- Build and publish to the appropriate registry

### 6. Operate and evolve

Because releases are isolated and explicit:

- Rollbacks are straightforward
- Release history is auditable
- Apps and packages can evolve independently

---

## What Smed Is / Is Not

### Smed is

- A production-oriented monorepo foundation
- A tool for long-lived SaaS products
- Opinionated, but transparent
- Designed for teams as well as solo developers

### Smed is not

- A quick demo starter
- A framework abstraction layer
- A black box that hides CI/CD logic
- A replacement for architectural thinking

Smed provides structure and automation—but expects you to make conscious product and architecture decisions.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT © [Guillaume Catel](https://github.com/guillaumecatel)

---

**Ready to forge your SaaS?** Star the repo and start building. 🔨
