import type { MeetingPlatform } from '@/features/meetings/types'

export type PlatformFilter = MeetingPlatform | 'all'

interface DashboardFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  platform: PlatformFilter
  onPlatformChange: (value: PlatformFilter) => void
}

export function DashboardFilters({
  search,
  onSearchChange,
  platform,
  onPlatformChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <label htmlFor="meeting-search" className="sr-only">
          Search meetings
        </label>
        <input
          id="meeting-search"
          type="search"
          placeholder="Search by title or topic…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
      </div>
      <div>
        <label htmlFor="platform-filter" className="sr-only">
          Filter by platform
        </label>
        <select
          id="platform-filter"
          value={platform}
          onChange={(event) => onPlatformChange(event.target.value as PlatformFilter)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="all">All platforms</option>
          <option value="zoom">Zoom</option>
          <option value="google-meet">Google Meet</option>
        </select>
      </div>
    </div>
  )
}
