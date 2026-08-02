import type { TaskSyncProvider } from '@/features/meetings/types'

export interface TaskIntegration {
  id: TaskSyncProvider
  name: string
  description: string
  connected: boolean
  autoSyncEnabled: boolean
  connectedWorkspace?: string
}
