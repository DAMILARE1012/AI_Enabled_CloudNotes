import { useState, type FormEvent } from 'react'
import type { Integration } from '../types'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface ConnectModalProps {
  integration: Integration
  open: boolean
  onClose: () => void
  onConnect: (email: string) => void
  isConnecting: boolean
}

export function ConnectModal({
  integration,
  open,
  onClose,
  onConnect,
  isConnecting,
}: ConnectModalProps) {
  const [email, setEmail] = useState('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onConnect(email)
  }

  return (
    <Modal open={open} onClose={onClose} title={`Connect ${integration.name}`}>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Authorize CloudNotes to join {integration.name} calls on your calendar and take
        notes on your behalf.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <Input
          label={`${integration.name} account email`}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
