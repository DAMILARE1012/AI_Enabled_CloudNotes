export type MeetingPlatform = 'zoom' | 'google-meet'

export type MeetingStatus = 'scheduled' | 'in-progress' | 'completed'

export type TaskSyncProvider = 'linear' | 'asana'

export interface Participant {
  id: string
  name: string
  role?: string
  avatarColor: string
}

export interface TranscriptTurn {
  id: string
  speakerId: string
  timestamp: string
  text: string
  edited?: boolean
}

export interface ActionItemSync {
  provider: TaskSyncProvider
  externalUrl: string
}

export interface AudioRecording {
  url: string
  format: string
}

export interface ActionItem {
  id: string
  description: string
  owner?: string
  done: boolean
  syncedTo?: ActionItemSync
}

export interface Meeting {
  id: string
  title: string
  date: string
  platform: MeetingPlatform
  status: MeetingStatus
  durationMinutes: number
  participants: Participant[]
  summary: string
  summaryEditedAt?: string
  keyTopics: string[]
  transcript: TranscriptTurn[]
  actionItems: ActionItem[]
  seriesId?: string
  seriesTitle?: string
  audioRecording?: AudioRecording
}

export interface ChatMessage {
  id: string
  role: 'user' | 'agent'
  text: string
  timestamp: string
}
