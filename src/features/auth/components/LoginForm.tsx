import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/app/hooks'
import { credentialsSet } from '@/features/auth/authSlice'
import { useLoginMutation } from '@/features/auth/api'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setFormError(null)
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(credentialsSet(result))
      navigate('/dashboard', { replace: true })
    } catch {
      setFormError(
        'Invalid email or password. Try any email with a password of 4+ characters.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {formError && <ErrorBanner message={formError} />}
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" disabled={isLoading} className="mt-2">
        {isLoading ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  )
}
