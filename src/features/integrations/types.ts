export type IntegrationProvider = 'zoom' | 'google-meet' | 'google-calendar'

export interface Integration {
  id: IntegrationProvider
  name: string
  description: string
  connected: boolean
  autoJoinEnabled: boolean
  connectedAccountEmail?: string
}
