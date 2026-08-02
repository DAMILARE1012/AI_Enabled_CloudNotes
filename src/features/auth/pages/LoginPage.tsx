import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { Button } from '@/components/ui/Button'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { Spinner } from '@/components/ui/Spinner'

export function LoginPage() {
  const auth = useAuth()
  const [signinError, setSigninError] = useState<string | null>(null)

  async function handleSignIn() {
    setSigninError(null)
    try {
      await auth.signinRedirect()
    } catch (error) {
      // signinRedirect() rejects (rather than setting auth.error) for client-side
      // config problems — e.g. a malformed VITE_COGNITO_AUTHORITY — so it needs
      // its own catch to avoid failing silently.
      setSigninError(error instanceof Error ? error.message : 'Something went wrong.')
    }
  }

  const errorMessage = signinError ?? auth.error?.message

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Welcome to CloudNotes
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign in to see notes your AI agent captured from your meetings.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {errorMessage && <ErrorBanner message={`Couldn't sign in: ${errorMessage}`} />}

          {auth.isLoading ? (
            <div className="flex justify-center py-2">
              <Spinner label="Signing in" />
            </div>
          ) : (
            <Button onClick={handleSignIn}>Sign in</Button>
          )}
        </div>
      </div>
    </div>
  )
}
