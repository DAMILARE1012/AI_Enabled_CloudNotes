import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { mobileNavClosed } from '@/app/uiSlice'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppShell() {
  const dispatch = useAppDispatch()
  const mobileNavOpen = useAppSelector((state) => state.ui.mobileNavOpen)

  useEffect(() => {
    if (!mobileNavOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') dispatch(mobileNavClosed())
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileNavOpen, dispatch])

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar className="hidden lg:flex" />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/50"
            onClick={() => dispatch(mobileNavClosed())}
            aria-hidden="true"
          />
          <Sidebar
            variant="mobile"
            className="relative z-10 flex bg-white dark:bg-slate-900"
          />
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
