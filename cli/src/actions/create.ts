import { confirm, input, select } from '@inquirer/prompts'
import chalk from 'chalk'
import { copy } from 'fs-extra'
import path from 'node:path'
import ora from 'ora'

import type { CliConfig, Template } from '../types'

import {
  checkTargetExists,
  groupTemplatesByCategory,
  loadConfig,
  parsePathMappings,
  resolveTargetPath,
  resolveTemplates,
} from '../helpers'

export default async function create(): Promise<void> {
  try {
    // 1. Charger la config et les templates
    const config = await loadConfig()
    const mappings = parsePathMappings(config)

    const spinner = ora('Loading templates...').start()
    const templates = await resolveTemplates(mappings)
    spinner.stop()

    if (templates.length === 0) {
      console.log(
        chalk.yellow('No templates found in smed.json configuration.'),
      )
      return
    }

    // 2. Grouper les templates par type (apps/packages/other)
    const templatesByType = groupTemplatesByCategory(templates)
    const types = Object.keys(templatesByType)

    // 3. Sélectionner le type
    const type = await select<string>({
      message: 'What do you want to create?',
      choices: types.map((t) => ({
        name: t,
        value: t,
        description: `Create a new ${t.replace('/*', '')}`,
      })),
    })

    // 4. Sélectionner le template
    const availableTemplates = templatesByType[type]
    const template = await select<Template>({
      message: 'Choose a template:',
      choices: availableTemplates.map((t) => ({
        name: t.name,
        value: t,
        description: `Template: ${t.path}`,
      })),
    })

    // 5. Demander le nom (seulement si c'est un pattern glob)
    let name: string
    let targetPath: string

    if (template.targetPattern.includes('*')) {
      name = await input({
        message: `Enter the name for the new ${type.replace('/*', '')}:`,
        validate: (val: string) => {
          if (!val.trim()) {
            return 'Name is required'
          }
          if (!/^[a-z0-9-]+$/.test(val)) {
            return 'Name must contain only lowercase letters, numbers, and hyphens'
          }
          if (val.length < 2) {
            return 'Name must be at least 2 characters long'
          }
          if (val.length > 50) {
            return 'Name must be less than 50 characters'
          }
          return true
        },
      })

      targetPath = resolveTargetPath(template.targetPattern, name)

      // Vérifier si le chemin existe déjà
      if (await checkTargetExists(targetPath)) {
        console.log(chalk.yellow(`\n⚠️  ${targetPath} already exists.`))
        const overwrite = await confirm({
          message: 'Do you want to overwrite it?',
          default: false,
        })

        if (!overwrite) {
          console.log(chalk.blue('\n✖ Cancelled.\n'))
          return
        }
      }
    } else {
      // Pattern exact - utiliser tel quel
      name = path.basename(template.targetPattern)
      targetPath = template.targetPattern

      if (await checkTargetExists(targetPath)) {
        console.log(chalk.yellow(`\n⚠️  ${targetPath} already exists.`))
        const proceed = await confirm({
          message: 'Do you want to continue anyway?',
          default: false,
        })

        if (!proceed) {
          console.log(chalk.blue('\n✖ Cancelled.\n'))
          return
        }
      }
    }

    // 6. Demander si on veut déployer/publier
    const isApp = type.includes('app')
    const deployOrPublish = await confirm({
      message: `Do you want to ${isApp ? 'deploy' : 'publish'} the new ${type.replace('/*', '')}?`,
      default: false,
    })

    // 7. Afficher le récapitulatif
    console.log(chalk.dim('\n📋 Summary:'))
    console.log(chalk.dim(`  Type:      ${type.replace('/*', '')}`))
    console.log(chalk.dim(`  Template:  ${template.name}`))
    console.log(chalk.dim(`  Name:      ${name}`))
    console.log(chalk.dim(`  Target:    ${targetPath}`))
    console.log(
      chalk.dim(
        `  ${isApp ? 'Deploy' : 'Publish'}:    ${deployOrPublish ? 'Yes' : 'No'}`,
      ),
    )
    console.log()

    const proceed = await confirm({
      message: 'Proceed with creation?',
      default: true,
    })

    if (!proceed) {
      console.log(chalk.blue('\n✖ Cancelled.\n'))
      return
    }

    // 8. Créer depuis le template
    await createFromTemplate({
      template,
      name,
      targetPath,
      config,
      deployOrPublish,
    })

    // 9. Succès
    console.log(
      chalk.green(
        `\n✅ Successfully created ${chalk.bold(name)} at ${chalk.bold(targetPath)}\n`,
      ),
    )

    // 10. Next steps
    console.log(chalk.dim('📝 Next steps:'))
    console.log(chalk.cyan(`  cd ${targetPath}`))
    console.log(chalk.cyan(`  pnpm install`))
    console.log(chalk.cyan(`  pnpm dev`))

    if (deployOrPublish) {
      console.log(
        chalk.dim(
          `\n💡 ${isApp ? 'Deployment' : 'Publishing'} configuration has been enabled.`,
        ),
      )
      console.log(
        chalk.dim(
          `   Check the generated workflow files in .github/workflows/\n`,
        ),
      )
    } else {
      console.log()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red(`\n❌ Error: ${error.message}\n`))
    } else {
      console.error(chalk.red('\n❌ An unexpected error occurred\n'))
    }
    process.exit(1)
  }
}

interface CreateFromTemplateOptions {
  template: Template
  name: string
  targetPath: string
  config: CliConfig
  deployOrPublish: boolean
}

async function createFromTemplate(
  options: CreateFromTemplateOptions,
): Promise<void> {
  const spinner = ora('Creating from template...').start()

  try {
    const sourcePath = path.join(process.cwd(), options.template.path)
    const targetPath = path.join(process.cwd(), options.targetPath)

    // Étape 1: Copier le template
    spinner.text = 'Copying template files...'
    await copy(sourcePath, targetPath, {
      overwrite: true,
      errorOnExist: false,
      filter: (src) => {
        const relativePath = path.relative(sourcePath, src)

        // Exclure certains fichiers/dossiers
        const exclude = [
          'node_modules',
          'dist',
          'build',
          '.turbo',
          '.next',
          '.nuxt',
          '.output',
          '.cache',
          'coverage',
          '.env.local',
          '.env.*.local',
          '__template__.json',
          'pnpm-lock.yaml',
          'package-lock.json',
          'yarn.lock',
        ]

        return !exclude.some((pattern) => {
          if (pattern.startsWith('.')) {
            return (
              relativePath === pattern || relativePath.startsWith(pattern + '/')
            )
          }
          return relativePath.startsWith(pattern)
        })
      },
    })

    spinner.succeed(chalk.green('✓ Template files copied'))
  } catch (error) {
    spinner.fail(chalk.red('✗ Failed to create from template'))
    throw error
  }
}
