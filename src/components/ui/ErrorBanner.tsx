import { Button } from './Button'

interface ErrorBannerProps {
  message?: string
  onRetry?: () => void
}

export function ErrorBanner({
  message = 'Something went wrong while loading this data.',
  onRetry,
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
    >
      <span>{message}</span>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  )
}
