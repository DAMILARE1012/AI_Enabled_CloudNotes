import { baseApi } from '@/api/baseApi'
import type { TaskIntegration } from './types'

export const taskSyncApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTaskIntegrations: builder.query<TaskIntegration[], void>({
      query: () => '/task-integrations',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'TaskIntegration' as const, id })),
              { type: 'TaskIntegration' as const, id: 'LIST' },
            ]
          : [{ type: 'TaskIntegration' as const, id: 'LIST' }],
    }),
    updateTaskIntegration: builder.mutation<
      TaskIntegration,
      { id: TaskIntegration['id']; changes: Partial<TaskIntegration> }
    >({
      query: ({ id, changes }) => ({
        url: `/task-integrations/${id}`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'TaskIntegration', id }],
    }),
  }),
})

export const { useGetTaskIntegrationsQuery, useUpdateTaskIntegrationMutation } =
  taskSyncApi
