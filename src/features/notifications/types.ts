export type NotificationChannel = 'email' | 'slack' | 'both' | 'none'
export type NotificationFrequency = 'immediately' | 'daily' | 'weekly'

export interface NotificationPreferences {
  channel: NotificationChannel
  frequency: NotificationFrequency
}

export interface NotificationEvent {
  id: string
  meetingId: string
  meetingTitle: string
  createdAt: string
  read: boolean
}
