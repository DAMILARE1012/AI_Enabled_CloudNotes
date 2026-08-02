import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { AuthCallbackPage } from '@/features/auth/pages/AuthCallbackPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { MeetingDetailPage } from '@/features/meetings/pages/MeetingDetailPage'
import { MeetingSeriesPage } from '@/features/meetings/pages/MeetingSeriesPage'
import { SettingsIntegrationsPage } from '@/features/integrations/pages/SettingsIntegrationsPage'
import { SettingsTaskSyncPage } from '@/features/taskSync/pages/SettingsTaskSyncPage'
import { SettingsNotificationsPage } from '@/features/notifications/pages/SettingsNotificationsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/auth/callback', element: <AuthCallbackPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/meetings/:meetingId', element: <MeetingDetailPage /> },
          { path: '/series/:seriesId', element: <MeetingSeriesPage /> },
          { path: '/settings/integrations', element: <SettingsIntegrationsPage /> },
          { path: '/settings/task-sync', element: <SettingsTaskSyncPage /> },
          { path: '/settings/notifications', element: <SettingsNotificationsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
