import { RouterProvider } from 'react-router-dom'
import { router } from './app/router'
import { useThemeSync } from './app/useThemeSync'

export function App() {
  useThemeSync()
  return <RouterProvider router={router} />
}
