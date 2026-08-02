import type { TaskIntegration } from '@/features/taskSync/types'

export const taskIntegrations: TaskIntegration[] = [
  {
    id: 'linear',
    name: 'Linear',
    description:
      'Push action items to Linear as issues so they show up where engineering already works.',
    connected: true,
    autoSyncEnabled: false,
    connectedWorkspace: 'cloudnotes-team',
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Push action items to Asana as tasks in a project of your choice.',
    connected: false,
    autoSyncEnabled: false,
  },
]
