import { Link } from 'react-router-dom'
import {
  useGetNotificationPreferencesQuery,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} from '../api'
import { NotificationPreferencesForm } from '../components/NotificationPreferencesForm'
import { PageContainer } from '@/components/layout/PageContainer'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { EmptyState } from '@/components/ui/EmptyState'
import { timeAgo } from '@/lib/utils'

export function SettingsNotificationsPage() {
  const {
    data: preferences,
    isLoading: preferencesLoading,
    isError: preferencesError,
    refetch: refetchPreferences,
  } = useGetNotificationPreferencesQuery()
  const { data: events, isLoading: eventsLoading } = useGetNotificationsQuery()
  const [markRead] = useMarkNotificationReadMutation()

  return (
    <PageContainer
      title="Notifications"
      description="Control when and how you're told your meeting notes are ready."
    >
      <div className="flex flex-col gap-6">
        {preferencesLoading && (
          <div className="flex justify-center py-8">
            <Spinner label="Loading preferences" />
          </div>
        )}
        {preferencesError && (
          <ErrorBanner
            message="Couldn't load your notification preferences."
            onRetry={refetchPreferences}
          />
        )}
        {preferences && <NotificationPreferencesForm preferences={preferences} />}

        <Card className="flex flex-col gap-3 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Recent notifications
          </h2>
          {eventsLoading && (
            <div className="flex justify-center py-6">
              <Spinner label="Loading notifications" />
            </div>
          )}
          {events && events.length === 0 && (
            <EmptyState
              title="No notifications yet"
              description="You'll see them here once your agent finishes taking notes on a meeting."
            />
          )}
          {events && events.length > 0 && (
            <ul className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="flex items-center justify-between gap-3 py-2.5"
                >
                  <Link
                    to={`/meetings/${event.meetingId}`}
                    className="flex-1 text-sm text-slate-700 hover:underline dark:text-slate-300"
                  >
                    Notes ready for{' '}
                    <span className="font-medium">{event.meetingTitle}</span>
                    <span className="block text-xs text-slate-400 dark:text-slate-500">
                      {timeAgo(event.createdAt)}
                    </span>
                  </Link>
                  {!event.read && (
                    <button
                      type="button"
                      onClick={() => markRead(event.id)}
                      className="shrink-0 text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Mark read
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </PageContainer>
  )
}
