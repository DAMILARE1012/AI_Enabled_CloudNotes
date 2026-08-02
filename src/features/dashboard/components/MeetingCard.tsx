import { Link } from 'react-router-dom'
import type { Meeting } from '@/features/meetings/types'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'
import { PlatformIcon } from '@/components/ui/PlatformIcon'
import { formatDuration, formatMeetingDate, formatMeetingTime } from '@/lib/utils'

type MeetingCardData = Omit<Meeting, 'transcript'>

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

export function MeetingCard({ meeting }: { meeting: MeetingCardData }) {
  return (
    <Card className="flex h-72 flex-col overflow-hidden p-4 transition-shadow hover:shadow-md">
      <Link to={`/meetings/${meeting.id}`} className="flex min-h-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <PlatformIcon provider={meeting.platform} />
            <div className="min-w-0">
              <h3 className="line-clamp-2 font-semibold text-slate-900 dark:text-slate-100">
                {meeting.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {formatMeetingDate(meeting.date)} · {formatMeetingTime(meeting.date)} ·{' '}
                {formatDuration(meeting.durationMinutes)}
              </p>
            </div>
          </div>
          <Badge tone={statusTone[meeting.status]} className="shrink-0">
            {statusLabel[meeting.status]}
          </Badge>
        </div>

        {meeting.summary && (
          <p className="line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
            {meeting.summary}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="flex -space-x-2">
            {meeting.participants.slice(0, 4).map((participant) => (
              <Avatar
                key={participant.id}
                name={participant.name}
                color={participant.avatarColor}
                size={26}
              />
            ))}
          </div>
          {meeting.actionItems.length > 0 && (
            <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
              {meeting.actionItems.filter((item) => !item.done).length} open action items
            </span>
          )}
        </div>
      </Link>

      {meeting.seriesId && (
        <Link
          to={`/series/${meeting.seriesId}`}
          className="mt-2 shrink-0 truncate text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Part of: {meeting.seriesTitle} →
        </Link>
      )}
    </Card>
  )
}
