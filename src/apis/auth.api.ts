import { apiClient, clearAuthToken, setAuthToken } from './apiClient'
import { API_URLS } from './apiUrls'

// ─── types ───────────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    avatar: string
    membershipTier: string
  }
}

// ─── api functions ───────────────────────────────────────────────────────────

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const data = await apiClient
    .post(API_URLS.auth.login, { json: payload })
    .json<AuthResponse>()
  setAuthToken(data.accessToken)
  return data
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const data = await apiClient
    .post(API_URLS.auth.register, { json: payload })
    .json<AuthResponse>()
  setAuthToken(data.accessToken)
  return data
}

export async function logout(): Promise<void> {
  await apiClient.post(API_URLS.auth.logout)
  clearAuthToken()
}

export async function refreshToken(
  token: string,
): Promise<Pick<AuthResponse, 'accessToken'>> {
  return apiClient
    .post(API_URLS.auth.refresh, { json: { refreshToken: token } })
    .json()
}

export async function forgotPassword(
  payload: ForgotPasswordPayload,
): Promise<void> {
  await apiClient.post(API_URLS.auth.forgotPassword, { json: payload })
}

export async function resetPassword(
  payload: ResetPasswordPayload,
): Promise<void> {
  await apiClient.post(API_URLS.auth.resetPassword, { json: payload })
}
