import { baseApi } from '@/api/baseApi'
import type { ChatMessage, Meeting, TaskSyncProvider } from './types'

type MeetingSummary = Omit<Meeting, 'transcript'>

export const meetingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<MeetingSummary[], void>({
      query: () => '/meetings',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Meeting' as const, id })),
              { type: 'Meeting' as const, id: 'LIST' },
            ]
          : [{ type: 'Meeting' as const, id: 'LIST' }],
    }),
    getMeetingById: builder.query<Meeting, string>({
      query: (id) => `/meetings/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Meeting', id }],
    }),
    getMeetingSeries: builder.query<MeetingSummary[], string>({
      query: (seriesId) => `/meetings/series/${seriesId}`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Meeting' as const, id })) : [],
    }),
    askMeetingQuestion: builder.mutation<
      ChatMessage,
      { meetingId: string; question: string }
    >({
      query: ({ meetingId, question }) => ({
        url: `/meetings/${meetingId}/chat`,
        method: 'POST',
        body: { question },
      }),
    }),
    updateMeetingSummary: builder.mutation<
      Meeting,
      { meetingId: string; summary: string }
    >({
      query: ({ meetingId, summary }) => ({
        url: `/meetings/${meetingId}/summary`,
        method: 'PATCH',
        body: { summary },
      }),
      invalidatesTags: (_result, _error, { meetingId }) => [
        { type: 'Meeting', id: meetingId },
      ],
    }),
    updateTranscriptTurn: builder.mutation<
      Meeting,
      { meetingId: string; turnId: string; text: string }
    >({
      query: ({ meetingId, turnId, text }) => ({
        url: `/meetings/${meetingId}/transcript/${turnId}`,
        method: 'PATCH',
        body: { text },
      }),
      invalidatesTags: (_result, _error, { meetingId }) => [
        { type: 'Meeting', id: meetingId },
      ],
    }),
    syncActionItem: builder.mutation<
      Meeting,
      { meetingId: string; itemId: string; provider: TaskSyncProvider }
    >({
      query: ({ meetingId, itemId, provider }) => ({
        url: `/meetings/${meetingId}/action-items/${itemId}/sync`,
        method: 'POST',
        body: { provider },
      }),
      invalidatesTags: (_result, _error, { meetingId }) => [
        { type: 'Meeting', id: meetingId },
      ],
    }),
  }),
})

export const {
  useGetMeetingsQuery,
  useGetMeetingByIdQuery,
  useGetMeetingSeriesQuery,
  useAskMeetingQuestionMutation,
  useUpdateMeetingSummaryMutation,
  useUpdateTranscriptTurnMutation,
  useSyncActionItemMutation,
} = meetingsApi
