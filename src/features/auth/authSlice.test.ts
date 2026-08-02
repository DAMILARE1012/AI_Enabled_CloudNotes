import { beforeEach, describe, expect, it } from 'vitest'
import { authReducer, credentialsSet, loggedOut } from './authSlice'
import type { User } from './types'

const user: User = {
  id: 'u1',
  name: 'Dami',
  email: 'dolatunj@andrew.cmu.edu',
  avatarColor: '#6366f1',
}

describe('authSlice', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts logged out when nothing is persisted', () => {
    const state = authReducer(undefined, { type: '@@INIT' })
    expect(state.token).toBeNull()
    expect(state.user).toBeNull()
  })

  it('stores the token and user on credentialsSet, and persists to localStorage', () => {
    const state = authReducer(undefined, credentialsSet({ token: 'abc123', user }))
    expect(state.token).toBe('abc123')
    expect(state.user).toEqual(user)
    expect(JSON.parse(localStorage.getItem('cloudnotes_auth')!)).toEqual(state)
  })

  it('clears the session on loggedOut', () => {
    const signedIn = authReducer(undefined, credentialsSet({ token: 'abc123', user }))
    const signedOut = authReducer(signedIn, loggedOut())
    expect(signedOut.token).toBeNull()
    expect(signedOut.user).toBeNull()
    expect(localStorage.getItem('cloudnotes_auth')).toBeNull()
  })
})
