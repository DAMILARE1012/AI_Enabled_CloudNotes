import type { Meeting } from '@/features/meetings/types'
import { Card } from '@/components/ui/Card'

type MeetingSummary = Omit<Meeting, 'transcript'>

function startOfWeek(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  const diff = (day + 6) % 7 // Monday as start of week
  result.setDate(result.getDate() - diff)
  result.setHours(0, 0, 0, 0)
  return result
}

export function StatsOverview({ meetings }: { meetings: MeetingSummary[] }) {
  const weekStart = startOfWeek(new Date())
  const meetingsThisWeek = meetings.filter(
    (meeting) => new Date(meeting.date) >= weekStart,
  )
  const totalMinutes = meetings.reduce((sum, meeting) => sum + meeting.durationMinutes, 0)
  const openActionItems = meetings.reduce(
    (sum, meeting) => sum + meeting.actionItems.filter((item) => !item.done).length,
    0,
  )

  const stats = [
    { label: 'Meetings this week', value: meetingsThisWeek.length },
    { label: 'Hours captured', value: (totalMinutes / 60).toFixed(1) },
    { label: 'Open action items', value: openActionItems },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
