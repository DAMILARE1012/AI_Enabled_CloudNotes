import { UserManager } from 'oidc-client-ts'
import { cognitoAuthConfig } from './cognitoConfig'

// A second UserManager instance reading the same underlying token storage that
// react-oidc-context's <AuthProvider> writes to. RTK Query's prepareHeaders runs
// outside React, so it can't call the useAuth() hook — this gives it read access
// to the current access token without duplicating the sign-in/refresh logic.
const userManager = new UserManager(cognitoAuthConfig)

export async function getCognitoAccessToken(): Promise<string | undefined> {
  const user = await userManager.getUser()
  return user && !user.expired ? user.access_token : undefined
}
