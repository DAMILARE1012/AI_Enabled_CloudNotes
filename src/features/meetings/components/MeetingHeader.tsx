import { Link } from 'react-router-dom'
import type { Meeting } from '../types'
import { Badge } from '@/components/ui/Badge'
import { PlatformIcon } from '@/components/ui/PlatformIcon'
import { formatDuration, formatMeetingDate, formatMeetingTime } from '@/lib/utils'

const statusTone = {
  completed: 'success',
  'in-progress': 'info',
  scheduled: 'neutral',
} as const

const statusLabel = {
  completed: 'Completed',
  'in-progress': 'In progress',
  scheduled: 'Scheduled',
} as const

export function MeetingHeader({ meeting }: { meeting: Meeting }) {
  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/dashboard"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M10 3 5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to dashboard
      </Link>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <PlatformIcon provider={meeting.platform} size={40} />
          <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {meeting.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {formatMeetingDate(meeting.date)} at {formatMeetingTime(meeting.date)} ·{' '}
              {formatDuration(meeting.durationMinutes)}
            </p>
            {meeting.seriesId && (
              <Link
                to={`/series/${meeting.seriesId}`}
                className="mt-1 inline-block text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                Part of: {meeting.seriesTitle} →
              </Link>
            )}
          </div>
        </div>
        <Badge tone={statusTone[meeting.status]}>{statusLabel[meeting.status]}</Badge>
      </div>
    </div>
  )
}
