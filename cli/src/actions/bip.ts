import { select } from '@inquirer/prompts'

import controller from '../commands'

/*
 * (bip)
 * Description: Main action to display the interactive command prompt
 * Usage: pnpm <cli-command>
 */
export default async function bip() {
  const selectedCmd = await select({
    message: 'Choose a command to run:',
    choices: controller.map((c) => ({
      name: c.name,
      value: c.name,
      description: c.description,
      short: c.name,
    })),
  })

  const cmd = controller.find((c) => c.name === selectedCmd)
  if (cmd) cmd.action()
}
