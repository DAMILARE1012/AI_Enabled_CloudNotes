import { baseApi } from '@/api/baseApi'
import type { NotificationEvent, NotificationPreferences } from './types'

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationEvent[], void>({
      query: () => '/notifications',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Notification' as const, id })),
              { type: 'Notification' as const, id: 'LIST' },
            ]
          : [{ type: 'Notification' as const, id: 'LIST' }],
    }),
    markNotificationRead: builder.mutation<NotificationEvent, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Notification', id }],
    }),
    getNotificationPreferences: builder.query<NotificationPreferences, void>({
      query: () => '/notifications/preferences',
      providesTags: ['NotificationPreferences'],
    }),
    updateNotificationPreferences: builder.mutation<
      NotificationPreferences,
      Partial<NotificationPreferences>
    >({
      query: (changes) => ({
        url: '/notifications/preferences',
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: ['NotificationPreferences'],
    }),
  }),
})

export const {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useGetNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} = notificationsApi
