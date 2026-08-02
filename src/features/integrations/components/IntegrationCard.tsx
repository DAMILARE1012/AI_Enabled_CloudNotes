import { useState } from 'react'
import type { Integration } from '../types'
import { useUpdateIntegrationMutation } from '../api'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { PlatformIcon } from '@/components/ui/PlatformIcon'
import { ConnectModal } from './ConnectModal'

export function IntegrationCard({ integration }: { integration: Integration }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [updateIntegration, { isLoading }] = useUpdateIntegrationMutation()

  function handleConnect(email: string) {
    updateIntegration({
      id: integration.id,
      changes: { connected: true, autoJoinEnabled: true, connectedAccountEmail: email },
    })
      .unwrap()
      .then(() => setModalOpen(false))
  }

  function handleDisconnect() {
    updateIntegration({
      id: integration.id,
      changes: {
        connected: false,
        autoJoinEnabled: false,
        connectedAccountEmail: undefined,
      },
    })
  }

  function handleAutoJoinToggle(checked: boolean) {
    updateIntegration({ id: integration.id, changes: { autoJoinEnabled: checked } })
  }

  return (
    <Card className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <PlatformIcon provider={integration.id} size={36} />
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
          {integration.connectedAccountEmail && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Connected as {integration.connectedAccountEmail}
            </p>
          )}
          <div className="flex items-center justify-between">
            <label
              htmlFor={`autojoin-${integration.id}`}
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Auto-join &amp; take notes
            </label>
            <Switch
              label={`Auto-join and take notes for ${integration.name}`}
              checked={integration.autoJoinEnabled}
              onChange={handleAutoJoinToggle}
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

      <ConnectModal
        integration={integration}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConnect={handleConnect}
        isConnecting={isLoading}
      />
    </Card>
  )
}
