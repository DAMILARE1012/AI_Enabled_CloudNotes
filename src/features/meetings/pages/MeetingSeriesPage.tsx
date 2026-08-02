import { Link, useParams } from 'react-router-dom'
import { useGetMeetingSeriesQuery } from '../api'
import { PageContainer } from '@/components/layout/PageContainer'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { PlatformIcon } from '@/components/ui/PlatformIcon'
import { formatDuration, formatMeetingDate, formatMeetingTime } from '@/lib/utils'

const statusTone = {
  completed: 'success',
  'in-progress': 'info',
  scheduled: 'neutral',
} as const

export function MeetingSeriesPage() {
  const { seriesId } = useParams<{ seriesId: string }>()
  const {
    data: meetings,
    isLoading,
    isError,
    refetch,
  } = useGetMeetingSeriesQuery(seriesId ?? '', {
    skip: !seriesId,
  })

  return (
    <PageContainer
      title={meetings?.[0]?.seriesTitle ?? 'Meeting series'}
      description="Every instance of this recurring meeting, oldest first, so you can see what changed since last time."
    >
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner label="Loading series" />
        </div>
      )}

      {isError && (
        <ErrorBanner message="Couldn't load this meeting series." onRetry={refetch} />
      )}

      {meetings && meetings.length === 0 && (
        <EmptyState
          title="No meetings found"
          description="This series has no recorded meetings yet."
        />
      )}

      {meetings && meetings.length > 0 && (
        <ol className="relative flex flex-col gap-6 border-l border-slate-200 pl-6 dark:border-slate-800">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-indigo-500 dark:border-slate-950" />
              <Link
                to={`/meetings/${meeting.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <PlatformIcon provider={meeting.platform} size={28} />
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatMeetingDate(meeting.date)} ·{' '}
                        {formatMeetingTime(meeting.date)} ·{' '}
                        {formatDuration(meeting.durationMinutes)}
                      </p>
                      {meeting.summary && (
                        <p className="mt-1 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">
                          {meeting.summary}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge tone={statusTone[meeting.status]}>{meeting.status}</Badge>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </PageContainer>
  )
}
