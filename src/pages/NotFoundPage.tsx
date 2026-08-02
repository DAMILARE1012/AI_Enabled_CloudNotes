import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center dark:bg-slate-950">
      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Page not found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  )
}
