import type { Integration } from '@/features/integrations/types'

export const integrations: Integration[] = [
  {
    id: 'zoom',
    name: 'Zoom',
    description:
      'Let the CloudNotes agent join and record notes from your Zoom meetings.',
    connected: true,
    autoJoinEnabled: true,
    connectedAccountEmail: 'dolatunj@andrew.cmu.edu',
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    description:
      'Let the CloudNotes agent join and record notes from your Google Meet calls.',
    connected: true,
    autoJoinEnabled: true,
    connectedAccountEmail: 'dolatunj@andrew.cmu.edu',
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description:
      'Sync your calendar so CloudNotes knows which meetings to join automatically.',
    connected: false,
    autoJoinEnabled: false,
  },
]
