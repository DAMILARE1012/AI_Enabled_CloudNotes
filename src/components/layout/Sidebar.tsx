import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { mobileNavClosed, sidebarCollapseToggled } from '@/app/uiSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="6"
        height="6"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="11"
        y="3"
        width="6"
        height="6"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="11"
        width="6"
        height="6"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="11"
        y="11"
        width="6"
        height="6"
        rx="1.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function IntegrationsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M8 12a4 4 0 0 1 0-5.66l2-2a4 4 0 0 1 5.66 5.66l-1 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 8a4 4 0 0 1 0 5.66l-2 2a4 4 0 0 1-5.66-5.66l1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function TaskSyncIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 5.5h7M4 10h7M4 14.5h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="m13.5 12.5 1.5 1.5 3-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function NotificationsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 8a5 5 0 0 1 10 0v3.5l1.5 2.5h-13L5 11.5V8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 16.5a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CollapseIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn('transition-transform', collapsed && 'rotate-180')}
    >
      <path
        d="M12 4 7 9l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const primaryNavItems: { to: string; label: string; icon: ReactNode }[] = [
  { to: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
]

const settingsNavItems: { to: string; label: string; icon: ReactNode }[] = [
  { to: '/settings/integrations', label: 'Integrations', icon: <IntegrationsIcon /> },
  { to: '/settings/task-sync', label: 'Task Sync', icon: <TaskSyncIcon /> },
  { to: '/settings/notifications', label: 'Notifications', icon: <NotificationsIcon /> },
]

interface SidebarProps {
  className?: string
  onNavigate?: () => void
  variant?: 'desktop' | 'mobile'
}

export function Sidebar({ className, onNavigate, variant = 'desktop' }: SidebarProps) {
  const dispatch = useAppDispatch()
  const collapsed = useAppSelector(
    (state) => variant === 'desktop' && state.ui.sidebarCollapsed,
  )

  function linkClassName({ isActive }: { isActive: boolean }) {
    return cn(
      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
      collapsed && 'justify-center px-0',
      isActive
        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
    )
  }

  function handleNavigate() {
    dispatch(mobileNavClosed())
    onNavigate?.()
  }

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'flex flex-col gap-1 border-r border-slate-200 p-4 transition-[width] duration-150 dark:border-slate-800',
        collapsed ? 'w-16' : 'w-64',
        className,
      )}
    >
      <div
        className={cn(
          'mb-4 flex items-center gap-2 px-2',
          collapsed && 'justify-center px-0',
        )}
      >
        {!collapsed && (
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            CloudNotes
          </span>
        )}
        {variant === 'desktop' && (
          <button
            type="button"
            onClick={() => dispatch(sidebarCollapseToggled())}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
              !collapsed && 'ml-auto',
            )}
          >
            <CollapseIcon collapsed={collapsed} />
          </button>
        )}
      </div>

      {primaryNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={handleNavigate}
          className={linkClassName}
          aria-label={collapsed ? item.label : undefined}
          title={collapsed ? item.label : undefined}
        >
          {item.icon}
          {!collapsed && item.label}
        </NavLink>
      ))}

      {!collapsed && (
        <p className="mb-1 mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Settings
        </p>
      )}
      {collapsed && (
        <div className="my-2 border-t border-slate-200 dark:border-slate-800" />
      )}
      {settingsNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={handleNavigate}
          className={linkClassName}
          aria-label={collapsed ? item.label : undefined}
          title={collapsed ? item.label : undefined}
        >
          {item.icon}
          {!collapsed && item.label}
        </NavLink>
      ))}
    </nav>
  )
}
