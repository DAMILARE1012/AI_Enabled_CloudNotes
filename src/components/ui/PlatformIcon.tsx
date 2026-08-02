import type { IntegrationProvider } from '@/features/integrations/types'

const config: Record<IntegrationProvider, { label: string; bg: string; fg: string }> = {
  zoom: { label: 'Zoom', bg: '#e0edff', fg: '#2563eb' },
  'google-meet': { label: 'Meet', bg: '#dcfce7', fg: '#16a34a' },
  'google-calendar': { label: 'Cal', bg: '#fef3c7', fg: '#b45309' },
}

interface PlatformIconProps {
  provider: IntegrationProvider
  size?: number
}

export function PlatformIcon({ provider, size = 32 }: PlatformIconProps) {
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
