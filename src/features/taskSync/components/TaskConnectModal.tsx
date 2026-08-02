import { useState, type FormEvent } from 'react'
import type { TaskIntegration } from '../types'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface TaskConnectModalProps {
  integration: TaskIntegration
  open: boolean
  onClose: () => void
  onConnect: (workspace: string) => void
  isConnecting: boolean
}

export function TaskConnectModal({
  integration,
  open,
  onClose,
  onConnect,
  isConnecting,
}: TaskConnectModalProps) {
  const [workspace, setWorkspace] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onConnect(workspace)
  }

  return (
    <Modal open={open} onClose={onClose} title={`Connect ${integration.name}`}>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Authorize CloudNotes to create {integration.name} issues from meeting action
        items.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <Input
          label={`${integration.name} workspace`}
          type="text"
          placeholder="e.g. cloudnotes-team"
          required
          value={workspace}
          onChange={(event) => setWorkspace(event.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isConnecting}>
            {isConnecting ? 'Connecting…' : 'Connect'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
