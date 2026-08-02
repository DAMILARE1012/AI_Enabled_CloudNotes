import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetNotificationsQuery, useMarkNotificationReadMutation } from '../api'
import { useClickOutside } from '@/hooks/useClickOutside'
import { timeAgo } from '@/lib/utils'

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { data: events } = useGetNotificationsQuery()
  const [markRead] = useMarkNotificationReadMutation()

  useClickOutside(containerRef, () => setOpen(false))

  useEffect(() => {
    if (!open) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const unreadCount = events?.filter((event) => !event.read).length ?? 0

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={open}
        className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      >
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
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between px-2 py-1">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Notifications
            </p>
            <Link
              to="/settings/notifications"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Preferences
            </Link>
          </div>
          {!events || events.length === 0 ? (
            <p className="px-2 py-4 text-sm text-slate-500 dark:text-slate-400">
              No notifications yet.
            </p>
          ) : (
            <ul className="flex max-h-80 flex-col gap-1 overflow-y-auto">
              {events.map((event) => (
                <li key={event.id}>
                  <Link
                    to={`/meetings/${event.meetingId}`}
                    onClick={() => {
                      if (!event.read) markRead(event.id)
                      setOpen(false)
                    }}
                    className="flex items-start gap-2 rounded-lg px-2 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    {!event.read && (
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={
                        event.read
                          ? 'ml-4 flex-1 text-slate-500 dark:text-slate-400'
                          : 'flex-1 text-slate-800 dark:text-slate-200'
                      }
                    >
                      Notes ready for{' '}
                      <span className="font-medium">{event.meetingTitle}</span>
                      <span className="block text-xs text-slate-400 dark:text-slate-500">
                        {timeAgo(event.createdAt)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
