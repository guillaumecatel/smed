#!/usr/bin/env node
import { program } from 'commander'

import config from '../../smed.json'
import bip from './actions/bip'
import printBanner from './banner'
import commands from './commands'

// Configure the CLI
program
  .name(config.cli.command)
  .description('Scaffolding Monorepo Tool')
  .version('0.0.0')
  .hook('preAction', printBanner)
  .action(/* entrypoint */ bip)

commands.forEach((command) => {
  program
    .command(command.name)
    .description(command.description)
    .action(command.action)
})

// Parse command-line arguments
program.parse()

// Handle graceful exit on prompt interruption
process.on('uncaughtException', (error) => {
  if (error instanceof Error && error.name === 'ExitPromptError') {
    console.log('👋 until next time!')
  } else {
    throw error
  }
})
