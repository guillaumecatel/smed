import add from './actions/add'
import create from './actions/create'
import eject from './actions/eject'
import list from './actions/list'
import remove from './actions/remove'
import sync from './actions/sync'

// Map all available commands
export default [
  {
    name: 'create',
    description: 'Create a new package or app from template',
    action: create,
  },
  {
    name: 'sync',
    description: 'Sync configuration across packages and apps',
    action: sync,
  },
  {
    name: 'list',
    description: 'List monorepo packages and apps',
    action: list,
  },
  {
    name: 'add',
    description: 'Add a monorepo package inside apps or another package',
    action: add,
  },
  {
    name: 'remove',
    description: 'Remove monorepo package from apps or another package',
    action: remove,
  },
  {
    name: 'eject',
    description: 'This will eject templates and configuration file',
    action: eject,
  },
]
