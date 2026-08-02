import { useEffect, useMemo, useState } from 'react'
import { useGetMeetingsQuery } from '@/features/meetings/api'
import { PageContainer } from '@/components/layout/PageContainer'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { Pagination } from '@/components/ui/Pagination'
import { useDebounce } from '@/hooks/useDebounce'
import { StatsOverview } from '../components/StatsOverview'
import { DashboardFilters, type PlatformFilter } from '../components/DashboardFilters'
import { MeetingList } from '../components/MeetingList'

const PAGE_SIZE = 6

export function DashboardPage() {
  const { data: meetings, isLoading, isError, refetch } = useGetMeetingsQuery()
  const [search, setSearch] = useState('')
  const [platform, setPlatform] = useState<PlatformFilter>('all')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(search)

  const filteredMeetings = useMemo(() => {
    if (!meetings) return []
    const query = debouncedSearch.trim().toLowerCase()
    return meetings
      .filter((meeting) => platform === 'all' || meeting.platform === platform)
      .filter(
        (meeting) =>
          !query ||
          meeting.title.toLowerCase().includes(query) ||
          meeting.keyTopics.some((topic) => topic.toLowerCase().includes(query)),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [meetings, platform, debouncedSearch])

  const totalPages = Math.max(1, Math.ceil(filteredMeetings.length / PAGE_SIZE))
  const pagedMeetings = filteredMeetings.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Filters/search change the result set, so the current page can point past the
  // end of it — snap back to page 1 whenever that happens instead of showing a blank page.
  useEffect(() => {
    setPage(1)
  }, [platform, debouncedSearch])

  return (
    <PageContainer
      title="Dashboard"
      description="Notes your AI agent captured from your recent Zoom and Google Meet calls."
    >
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner label="Loading meetings" />
        </div>
      )}

      {isError && (
        <ErrorBanner message="Couldn't load your meetings." onRetry={refetch} />
      )}

      {meetings && (
        <div className="flex flex-col gap-6">
          <StatsOverview meetings={meetings} />
          <DashboardFilters
            search={search}
            onSearchChange={setSearch}
            platform={platform}
            onPlatformChange={setPlatform}
          />
          <MeetingList meetings={pagedMeetings} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </PageContainer>
  )
}
