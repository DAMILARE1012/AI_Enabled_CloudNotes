import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { AuthProvider } from 'react-oidc-context'
import { store } from './app/store'
import { cognitoAuthConfig } from './auth/cognitoConfig'
import { App } from './App'
import './styles/index.css'

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCKS !== 'true') return
  const { worker } = await import('./api/mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

// Strips the ?code=&state= query params Cognito appends after redirecting back,
// so the auth code doesn't linger in the URL bar or browser history.
function onSigninCallback() {
  window.history.replaceState({}, document.title, window.location.pathname)
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider {...cognitoAuthConfig} onSigninCallback={onSigninCallback}>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </StrictMode>,
  )
})
