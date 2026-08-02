import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { themeToggled, mobileNavOpened } from '@/app/uiSlice'
import { loggedOut } from '@/features/auth/authSlice'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { NotificationBell } from '@/features/notifications/components/NotificationBell'

export function Topbar() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const theme = useAppSelector((state) => state.ui.theme)
  const user = useAppSelector((state) => state.auth.user)

  function handleLogout() {
    dispatch(loggedOut())
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800 sm:px-6">
      <button
        type="button"
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
        aria-label="Open navigation menu"
        onClick={() => dispatch(mobileNavOpened())}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M2.5 5h15M2.5 10h15M2.5 15h15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="flex flex-1 items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => dispatch(themeToggled())}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          {theme === 'dark' ? (
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 2.5v1.7M10 15.8v1.7M17.5 10h-1.7M4.2 10H2.5M15.1 4.9l-1.2 1.2M6.1 13.9l-1.2 1.2M15.1 15.1l-1.2-1.2M6.1 6.1 4.9 4.9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M17 11.3A7 7 0 0 1 8.7 3 7 7 0 1 0 17 11.3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <NotificationBell />

        {user && <Avatar name={user.name} color={user.avatarColor} size={32} />}
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  )
}
