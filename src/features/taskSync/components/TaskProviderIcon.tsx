import type { TaskSyncProvider } from '@/features/meetings/types'

const config: Record<TaskSyncProvider, { label: string; bg: string; fg: string }> = {
  linear: { label: 'Lin', bg: '#e0e7ff', fg: '#4338ca' },
  asana: { label: 'Asa', bg: '#fbcfe8', fg: '#be185d' },
}

export function TaskProviderIcon({
  provider,
  size = 32,
}: {
  provider: TaskSyncProvider
  size?: number
}) {
  const { label, bg, fg } = config[provider]
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-lg font-semibold"
      style={{
        backgroundColor: bg,
        color: fg,
        width: size,
        height: size,
        fontSize: size * 0.32,
      }}
      aria-hidden="true"
    >
      {label}
    </span>
  )
}
