import { useState } from 'react'
import type { TaskIntegration } from '../types'
import { useUpdateTaskIntegrationMutation } from '../api'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { TaskProviderIcon } from './TaskProviderIcon'
import { TaskConnectModal } from './TaskConnectModal'

export function TaskIntegrationCard({ integration }: { integration: TaskIntegration }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [updateIntegration, { isLoading }] = useUpdateTaskIntegrationMutation()

  function handleConnect(workspace: string) {
    updateIntegration({
      id: integration.id,
      changes: { connected: true, connectedWorkspace: workspace },
    })
      .unwrap()
      .then(() => setModalOpen(false))
  }

  function handleDisconnect() {
    updateIntegration({
      id: integration.id,
      changes: {
        connected: false,
        autoSyncEnabled: false,
        connectedWorkspace: undefined,
      },
    })
  }

  function handleAutoSyncToggle(checked: boolean) {
    updateIntegration({ id: integration.id, changes: { autoSyncEnabled: checked } })
  }

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <TaskProviderIcon provider={integration.id} size={36} />
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {integration.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {integration.description}
            </p>
          </div>
        </div>
        <Badge tone={integration.connected ? 'success' : 'neutral'}>
          {integration.connected ? 'Connected' : 'Not connected'}
        </Badge>
      </div>

      {integration.connected ? (
        <div className="flex flex-col gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          {integration.connectedWorkspace && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Workspace: {integration.connectedWorkspace}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label
              htmlFor={`autosync-${integration.id}`}
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Auto-sync new action items
            </label>
            <Switch
              label={`Auto-sync new action items to ${integration.name}`}
              checked={integration.autoSyncEnabled}
              onChange={handleAutoSyncToggle}
              disabled={isLoading}
            />
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDisconnect}
            disabled={isLoading}
            className="self-start"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Button size="sm" onClick={() => setModalOpen(true)} className="self-start">
          Connect
        </Button>
      )}

      <TaskConnectModal
        integration={integration}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
        isConnecting={isLoading}
      />
    </Card>
  )
}
