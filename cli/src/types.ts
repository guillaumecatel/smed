export interface CliConfig {
  cli: {
    command: string
    paths: Record<string, string[]>
  }
  organization: {
    scope: string
    name: string
    email: string
  }
  repository: {
    url: string
    type: string
  }
}

export interface PathMapping {
  targetPattern: string // "apps/*" ou "docs"
  templatePaths: string[] // ["./templates/apps/*"]
  isGlob: boolean // true si contient *
}

export interface Template {
  name: string // "astro", "react"
  path: string // "./templates/apps/astro"
  targetPattern: string // "apps/*"
}

export interface CreateOptions {
  template: Template
  name: string
  targetPath: string
}
