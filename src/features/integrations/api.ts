import { baseApi } from '@/api/baseApi'
import type { Integration, IntegrationProvider } from './types'

export const integrationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIntegrations: builder.query<Integration[], void>({
      query: () => '/integrations',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Integration' as const, id })),
              { type: 'Integration' as const, id: 'LIST' },
            ]
          : [{ type: 'Integration' as const, id: 'LIST' }],
    }),
    updateIntegration: builder.mutation<
      Integration,
      { id: IntegrationProvider; changes: Partial<Integration> }
    >({
      query: ({ id, changes }) => ({
        url: `/integrations/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Integration', id }],
    }),
  }),
})

export const { useGetIntegrationsQuery, useUpdateIntegrationMutation } = integrationsApi
