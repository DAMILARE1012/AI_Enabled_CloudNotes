import type {
  NotificationEvent,
  NotificationPreferences,
} from '@/features/notifications/types'

export const notificationPreferences: NotificationPreferences = {
  channel: 'email',
  frequency: 'daily',
}

export const notificationEvents: NotificationEvent[] = [
  {
    id: 'n1',
    meetingId: 'sprint-14-retro',
    meetingTitle: 'Engineering Standup — Sprint 14 Retro',
    createdAt: '2026-08-01T13:35:00.000Z',
    read: false,
  },
  {
    id: 'n2',
    meetingId: 'marketing-product-sync',
    meetingTitle: 'Marketing & Product Sync',
    createdAt: '2026-08-01T19:30:00.000Z',
    read: false,
  },
  {
    id: 'n3',
    meetingId: 'customer-feedback-deep-dive',
    meetingTitle: 'Customer Feedback Deep Dive',
    createdAt: '2026-07-31T16:55:00.000Z',
    read: true,
  },
  {
    id: 'n4',
    meetingId: 'design-review-onboarding',
    meetingTitle: 'Design Review: Onboarding Flow',
    createdAt: '2026-07-29T18:10:00.000Z',
    read: true,
  },
  {
    id: 'n5',
    meetingId: 'q3-roadmap-sync',
    meetingTitle: 'Q3 Roadmap Sync',
    createdAt: '2026-07-28T15:45:00.000Z',
    read: true,
  },
]
