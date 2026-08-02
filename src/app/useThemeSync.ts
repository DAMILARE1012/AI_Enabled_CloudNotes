import { useEffect } from 'react'
import { useAppSelector } from './hooks'

export function useThemeSync() {
  const theme = useAppSelector((state) => state.ui.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
}
