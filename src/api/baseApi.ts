import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCognitoAccessToken } from '@/auth/cognitoUserManager'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getCognitoAccessToken()
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: [
    'Meeting',
    'Integration',
    'TaskIntegration',
    'Notification',
    'NotificationPreferences',
  ],
  endpoints: () => ({}),
})
