import type { UserManagerSettings } from 'oidc-client-ts'

export const cognitoAuthConfig: UserManagerSettings = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: 'code',
  scope: import.meta.env.VITE_COGNITO_SCOPE,
}

/**
 * Redirects to Cognito's Hosted UI /logout endpoint. Just calling the OIDC
 * client's local sign-out clears our own tokens but leaves the Hosted UI's own
 * session cookie intact, so the next "Sign in" would silently re-authenticate
 * without prompting — this is the full logout AWS's docs recommend instead.
 */
export function cognitoSignOutRedirect(): void {
  const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID
  const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI
  const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`
}
