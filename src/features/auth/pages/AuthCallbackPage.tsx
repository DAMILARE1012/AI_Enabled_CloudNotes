import { Navigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import { Spinner } from '@/components/ui/Spinner'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

/**
 * Dedicated target for VITE_COGNITO_REDIRECT_URI. Cognito lands here with
 * ?code=&state= after sign-in; react-oidc-context's <AuthProvider> processes
 * that asynchronously. This route exists purely so nothing else (like a root "/"
 * redirect) can navigate away and strip those query params before that finishes.
 */
export function AuthCallbackPage() {
  const auth = useAuth()

  if (auth.error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 dark:bg-slate-950">
        <ErrorBanner message={`Couldn't complete sign-in: ${auth.error.message}`} />
        <a
          href="/login"
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Back to sign in
        </a>
      </div>
    )
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
      <Spinner label="Completing sign-in" />
    </div>
  )
}
