import { createSlice } from '@reduxjs/toolkit'

const THEME_KEY = 'cloudnotes_theme'
const SIDEBAR_COLLAPSED_KEY = 'cloudnotes_sidebar_collapsed'

type Theme = 'light' | 'dark'

function loadInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function loadInitialSidebarCollapsed(): boolean {
  return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
}

interface UiState {
  theme: Theme
  mobileNavOpen: boolean
  sidebarCollapsed: boolean
}

const initialState: UiState = {
  theme: loadInitialTheme(),
  mobileNavOpen: false,
  sidebarCollapsed: loadInitialSidebarCollapsed(),
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    themeToggled: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
      localStorage.setItem(THEME_KEY, state.theme)
    },
    mobileNavOpened: (state) => {
      state.mobileNavOpen = true
    },
    mobileNavClosed: (state) => {
      state.mobileNavOpen = false
    },
    sidebarCollapseToggled: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(state.sidebarCollapsed))
    },
  },
})

export const { themeToggled, mobileNavOpened, mobileNavClosed, sidebarCollapseToggled } =
  uiSlice.actions
export const uiReducer = uiSlice.reducer
