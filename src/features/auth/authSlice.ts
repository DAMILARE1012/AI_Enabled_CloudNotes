import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from './types'

const STORAGE_KEY = 'cloudnotes_auth'

interface AuthState {
  token: string | null
  user: User | null
}

function loadPersistedAuth(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { token: null, user: null }
    return JSON.parse(raw) as AuthState
  } catch {
    return { token: null, user: null }
  }
}

const initialState: AuthState = loadPersistedAuth()

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    credentialsSet: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    loggedOut: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})

export const { credentialsSet, loggedOut } = authSlice.actions
export const authReducer = authSlice.reducer
