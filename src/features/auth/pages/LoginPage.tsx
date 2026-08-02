import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Welcome to CloudNotes
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign in to see notes your AI agent captured from your meetings.
        </p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
