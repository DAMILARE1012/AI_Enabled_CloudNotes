import type { ActionItem } from '../types'
import { useSyncActionItemMutation } from '../api'
import { useGetTaskIntegrationsQuery } from '@/features/taskSync/api'
import { TaskProviderIcon } from '@/features/taskSync/components/TaskProviderIcon'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'

interface ActionItemsListProps {
  meetingId: string
  items: ActionItem[]
}

function SyncControls({ meetingId, item }: { meetingId: string; item: ActionItem }) {
  const { data: taskIntegrations } = useGetTaskIntegrationsQuery()
  const [syncActionItem, { isLoading }] = useSyncActionItemMutation()
  const connectedProviders = (taskIntegrations ?? []).filter(
    (integration) => integration.connected,
  )

  if (item.syncedTo) {
    return (
      <a
        href={item.syncedTo.externalUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
      >
        <TaskProviderIcon provider={item.syncedTo.provider} size={16} />
        Synced — view issue
      </a>
    )
  }

  if (connectedProviders.length === 0) return null

  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {connectedProviders.map((integration) => (
        <button
          key={integration.id}
          type="button"
          disabled={isLoading}
          onClick={() =>
            syncActionItem({ meetingId, itemId: item.id, provider: integration.id })
          }
          className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Sync to {integration.name}
        </button>
      ))}
    </div>
  )
}

export function ActionItemsList({ meetingId, items }: ActionItemsListProps) {
  if (items.length === 0) {
    return (
      <Card className="p-5">
        <EmptyState
          title="No action items"
          description="Your agent didn't detect any follow-ups from this conversation."
        />
      </Card>
    )
  }

  return (
    <Card className="p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        Action Items
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={item.done}
              disabled
              aria-label={`${item.description}${item.done ? ' (done)' : ' (not done)'}`}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 dark:border-slate-600"
            />
            <div>
              <p
                className={
                  item.done
                    ? 'text-sm text-slate-400 line-through dark:text-slate-500'
                    : 'text-sm text-slate-800 dark:text-slate-200'
                }
              >
                {item.description}
              </p>
              {item.owner && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Owner: {item.owner}
                </p>
              )}
              <SyncControls meetingId={meetingId} item={item} />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
