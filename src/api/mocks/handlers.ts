import { http, HttpResponse, delay } from 'msw'
import type { Integration } from '@/features/integrations/types'
import type { TaskIntegration } from '@/features/taskSync/types'
import type {
  NotificationEvent,
  NotificationPreferences,
} from '@/features/notifications/types'
import type {
  ActionItemSync,
  ChatMessage,
  Meeting,
  TaskSyncProvider,
} from '@/features/meetings/types'
import { meetings } from './data/meetings'
import { integrations } from './data/integrations'
import { taskIntegrations } from './data/taskIntegrations'
import { notificationEvents, notificationPreferences } from './data/notifications'
import { answerFromTranscript } from '@/features/meetings/lib/chatEngine'

const API_BASE = import.meta.env.VITE_API_BASE_URL

// Mutable in-memory copies so writes (connect/disconnect, edits, sync, read state)
// persist for the session even though there's no real backend yet.
const meetingsState: Meeting[] = meetings.map((meeting) => ({
  ...meeting,
  participants: [...meeting.participants],
  keyTopics: [...meeting.keyTopics],
  transcript: meeting.transcript.map((turn) => ({ ...turn })),
  actionItems: meeting.actionItems.map((item) => ({ ...item })),
}))
const integrationsState: Integration[] = integrations.map((integration) => ({
  ...integration,
}))
const taskIntegrationsState: TaskIntegration[] = taskIntegrations.map((integration) => ({
  ...integration,
}))
const notificationEventsState: NotificationEvent[] = notificationEvents.map((event) => ({
  ...event,
}))
let notificationPreferencesState: NotificationPreferences = { ...notificationPreferences }

function mockExternalUrl(provider: TaskSyncProvider, itemId: string): string {
  return provider === 'linear'
    ? `https://linear.app/mock/issue/CN-${itemId.replace(/\D/g, '') || '1'}`
    : `https://app.asana.com/mock/task/${itemId}`
}

export const handlers = [
  http.get(`${API_BASE}/meetings`, async () => {
    await delay(500)
    const summaries = meetingsState.map(({ transcript: _transcript, ...rest }) => rest)
    return HttpResponse.json(summaries)
  }),

  http.get(`${API_BASE}/meetings/series/:seriesId`, async ({ params }) => {
    await delay(350)
    const seriesMeetings = meetingsState
      .filter((meeting) => meeting.seriesId === params.seriesId)
      .map(({ transcript: _transcript, ...rest }) => rest)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return HttpResponse.json(seriesMeetings)
  }),

  http.get(`${API_BASE}/meetings/:id`, async ({ params }) => {
    await delay(350)
    const meeting = meetingsState.find((m) => m.id === params.id)
    if (!meeting) {
      return HttpResponse.json({ message: 'Meeting not found.' }, { status: 404 })
    }
    return HttpResponse.json(meeting)
  }),

  http.post(`${API_BASE}/meetings/:id/chat`, async ({ params, request }) => {
    await delay(600)
    const meeting = meetingsState.find((m) => m.id === params.id)
    if (!meeting) {
      return HttpResponse.json({ message: 'Meeting not found.' }, { status: 404 })
    }
    const { question } = (await request.json()) as { question: string }
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'agent',
      text: answerFromTranscript(meeting, question),
      timestamp: new Date().toISOString(),
    }
    return HttpResponse.json(message)
  }),

  http.patch(`${API_BASE}/meetings/:id/summary`, async ({ params, request }) => {
    await delay(400)
    const meeting = meetingsState.find((m) => m.id === params.id)
    if (!meeting) {
      return HttpResponse.json({ message: 'Meeting not found.' }, { status: 404 })
    }
    const { summary } = (await request.json()) as { summary: string }
    meeting.summary = summary
    meeting.summaryEditedAt = new Date().toISOString()
    return HttpResponse.json(meeting)
  }),

  http.patch(
    `${API_BASE}/meetings/:id/transcript/:turnId`,
    async ({ params, request }) => {
      await delay(400)
      const meeting = meetingsState.find((m) => m.id === params.id)
      if (!meeting) {
        return HttpResponse.json({ message: 'Meeting not found.' }, { status: 404 })
      }
      const turn = meeting.transcript.find((t) => t.id === params.turnId)
      if (!turn) {
        return HttpResponse.json(
          { message: 'Transcript turn not found.' },
          { status: 404 },
        )
      }
      const { text } = (await request.json()) as { text: string }
      turn.text = text
      turn.edited = true
      return HttpResponse.json(meeting)
    },
  ),

  http.post(
    `${API_BASE}/meetings/:meetingId/action-items/:itemId/sync`,
    async ({ params, request }) => {
      await delay(500)
      const meeting = meetingsState.find((m) => m.id === params.meetingId)
      const item = meeting?.actionItems.find((i) => i.id === params.itemId)
      if (!meeting || !item) {
        return HttpResponse.json({ message: 'Action item not found.' }, { status: 404 })
      }
      const { provider } = (await request.json()) as { provider: TaskSyncProvider }
      const sync: ActionItemSync = {
        provider,
        externalUrl: mockExternalUrl(provider, item.id),
      }
      item.syncedTo = sync
      return HttpResponse.json(meeting)
    },
  ),

  http.get(`${API_BASE}/integrations`, async () => {
    await delay(300)
    return HttpResponse.json(integrationsState)
  }),

  http.patch(`${API_BASE}/integrations/:id`, async ({ params, request }) => {
    await delay(400)
    const updates = (await request.json()) as Partial<Integration>
    const index = integrationsState.findIndex(
      (integration) => integration.id === params.id,
    )
    if (index === -1) {
      return HttpResponse.json({ message: 'Integration not found.' }, { status: 404 })
    }
    integrationsState[index] = { ...integrationsState[index], ...updates }
    return HttpResponse.json(integrationsState[index])
  }),

  http.get(`${API_BASE}/task-integrations`, async () => {
    await delay(300)
    return HttpResponse.json(taskIntegrationsState)
  }),

  http.patch(`${API_BASE}/task-integrations/:id`, async ({ params, request }) => {
    await delay(400)
    const updates = (await request.json()) as Partial<TaskIntegration>
    const index = taskIntegrationsState.findIndex(
      (integration) => integration.id === params.id,
    )
    if (index === -1) {
      return HttpResponse.json(
        { message: 'Task integration not found.' },
        { status: 404 },
      )
    }
    taskIntegrationsState[index] = { ...taskIntegrationsState[index], ...updates }
    return HttpResponse.json(taskIntegrationsState[index])
  }),

  http.get(`${API_BASE}/notifications`, async () => {
    await delay(300)
    return HttpResponse.json(
      [...notificationEventsState].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    )
  }),

  http.patch(`${API_BASE}/notifications/:id/read`, async ({ params }) => {
    await delay(200)
    const event = notificationEventsState.find((e) => e.id === params.id)
    if (!event) {
      return HttpResponse.json({ message: 'Notification not found.' }, { status: 404 })
    }
    event.read = true
    return HttpResponse.json(event)
  }),

  http.get(`${API_BASE}/notifications/preferences`, async () => {
    await delay(250)
    return HttpResponse.json(notificationPreferencesState)
  }),

  http.patch(`${API_BASE}/notifications/preferences`, async ({ request }) => {
    await delay(350)
    const updates = (await request.json()) as Partial<NotificationPreferences>
    notificationPreferencesState = { ...notificationPreferencesState, ...updates }
    return HttpResponse.json(notificationPreferencesState)
  }),
]
