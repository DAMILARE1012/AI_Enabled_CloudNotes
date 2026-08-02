import { useGetTaskIntegrationsQuery } from '../api'
import { TaskIntegrationCard } from '../components/TaskIntegrationCard'
import { PageContainer } from '@/components/layout/PageContainer'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

export function SettingsTaskSyncPage() {
  const {
    data: integrations,
    isLoading,
    isError,
    refetch,
  } = useGetTaskIntegrationsQuery()

  return (
    <PageContainer
      title="Task Sync"
      description="Connect a task tracker so action items from your meetings show up where work already happens."
    >
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner label="Loading task integrations" />
        </div>
      )}

      {isError && (
        <ErrorBanner message="Couldn't load your task integrations." onRetry={refetch} />
      )}

      {integrations && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {integrations.map((integration) => (
            <TaskIntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
