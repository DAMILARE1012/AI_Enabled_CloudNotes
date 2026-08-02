import { useGetIntegrationsQuery } from '../api'
import { IntegrationCard } from '../components/IntegrationCard'
import { PageContainer } from '@/components/layout/PageContainer'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

export function SettingsIntegrationsPage() {
  const { data: integrations, isLoading, isError, refetch } = useGetIntegrationsQuery()

  return (
    <PageContainer
      title="Integrations"
      description="Connect the platforms your AI agent should join and take notes on your behalf."
    >
      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner label="Loading integrations" />
        </div>
      )}

      {isError && (
        <ErrorBanner message="Couldn't load your integrations." onRetry={refetch} />
      )}

      {integrations && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.id} integration={integration} />
          ))}
        </div>
      )}
    </PageContainer>
  )
}
