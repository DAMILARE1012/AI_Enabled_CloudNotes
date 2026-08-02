import type { Meeting } from '@/features/meetings/types'
import { MeetingCard } from './MeetingCard'
import { EmptyState } from '@/components/ui/EmptyState'

type MeetingSummary = Omit<Meeting, 'transcript'>

export function MeetingList({ meetings }: { meetings: MeetingSummary[] }) {
  if (meetings.length === 0) {
    return (
      <EmptyState
        title="No meetings match your filters"
        description="Try a different search term or reset the platform filter."
      />
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {meetings.map((meeting) => (
        <li key={meeting.id} className="h-full">
          <MeetingCard meeting={meeting} />
        </li>
      ))}
    </ul>
  )
}
