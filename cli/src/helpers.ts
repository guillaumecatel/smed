import { constants } from 'fs'
// cli/src/helpers.ts
import { access, readFile, writeFile } from 'fs/promises'
import { globby } from 'globby'
import path from 'path'

import type { CliConfig, PathMapping, Template } from './types'

/**
 * Vérifie si un chemin existe
 */
export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Lit un fichier JSON
 */
export async function readJSON<T = unknown>(filePath: string): Promise<T> {
  const content = await readFile(filePath, 'utf-8')
  return JSON.parse(content)
}

/**
 * Écrit un fichier JSON
 */
export async function writeJSON(
  filePath: string,
  data: unknown,
): Promise<void> {
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

/**
 * Charge la configuration smed.json
 */
export async function loadConfig(): Promise<CliConfig> {
  const configPath = path.join(process.cwd(), 'smed.json')

  if (!(await pathExists(configPath))) {
    throw new Error(
      'smed.json not found. Please run this command from the root of your monorepo.',
    )
  }

  return await readJSON<CliConfig>(configPath)
}

/**
 * Parse les paths de la config en mappings
 */
export function parsePathMappings(config: CliConfig): PathMapping[] {
  const mappings: PathMapping[] = []

  for (const [targetPattern, templatePaths] of Object.entries(
    config.cli.paths,
  )) {
    mappings.push({
      targetPattern,
      templatePaths,
      isGlob: targetPattern.includes('*'),
    })
  }

  return mappings
}

/**
 * Résout tous les templates disponibles depuis les mappings
 */
export async function resolveTemplates(
  mappings: PathMapping[],
): Promise<Template[]> {
  const templates: Template[] = []

  for (const mapping of mappings) {
    for (const templatePath of mapping.templatePaths) {
      if (templatePath.includes('*')) {
        // Glob pattern - résoudre tous les dossiers correspondants
        const matches = await globby(templatePath, {
          onlyDirectories: true,
          expandDirectories: false,
        })

        for (const match of matches) {
          const name = path.basename(match)
          templates.push({
            name,
            path: match,
            targetPattern: mapping.targetPattern,
          })
        }
      } else {
        // Path exact
        if (await pathExists(templatePath)) {
          const name = path.basename(templatePath)
          templates.push({
            name,
            path: templatePath,
            targetPattern: mapping.targetPattern,
          })
        }
      }
    }
  }

  return templates
}

/**
 * Calcule le chemin de destination basé sur le pattern et le nom
 */
export function resolveTargetPath(targetPattern: string, name: string): string {
  if (targetPattern.includes('*')) {
    // Remplacer * par le nom
    return targetPattern.replace('*', name)
  } else {
    // Path exact - utiliser tel quel
    return targetPattern
  }
}

/**
 * Vérifie si un chemin de destination existe déjà
 */
export async function checkTargetExists(targetPath: string): Promise<boolean> {
  return await pathExists(path.join(process.cwd(), targetPath))
}

/**
 * Formatte le nom du template pour l'affichage
 */
export function formatTemplateChoice(template: Template): string {
  const category = template.targetPattern.includes('*')
    ? template.targetPattern.split('/')[0]
    : path.dirname(template.targetPattern)

  return `${template.name} (${category})`
}

/**
 * Groupe les templates par catégorie
 */
export function groupTemplatesByCategory(
  templates: Template[],
): Record<string, Template[]> {
  const groups: Record<string, Template[]> = {}

  for (const template of templates) {
    const category = template.targetPattern.includes('*')
      ? template.targetPattern.split('/')[0]
      : 'other'

    if (!groups[category]) {
      groups[category] = []
    }

    groups[category].push(template)
  }

  return groups
}
