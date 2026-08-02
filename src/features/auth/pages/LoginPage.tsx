import { useState } from 'react'
import { useAuth } from 'react-oidc-context'
import { Button } from '@/components/ui/Button'
import { ErrorBanner } from '@/components/ui/ErrorBanner'
import { Spinner } from '@/components/ui/Spinner'
import { AuthIllustration } from '../components/AuthIllustration'

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
    <div className="flex min-h-screen bg-white dark:bg-slate-950">
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            CloudNotes
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            <span>SIGN</span>{' '}
            <span className="text-indigo-600 dark:text-indigo-400">IN</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to see notes your AI agent captured from your meetings.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {errorMessage && (
              <ErrorBanner message={`Couldn't sign in: ${errorMessage}`} />
            )}

            {auth.isLoading ? (
              <div className="flex justify-center py-2">
                <Spinner label="Signing in" />
              </div>
            ) : (
              <Button onClick={handleSignIn} className="w-full">
                Sign in
              </Button>
            )}

            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
              You'll be redirected to a secure sign-in page.
            </p>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            Not a member?{' '}
            <button
              type="button"
              onClick={handleSignIn}
              className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2">
        <AuthIllustration />
      </div>
    </div>
  )
}
