import { apiClient } from './apiClient'
import { API_URLS } from './apiUrls'

// ─── types ───────────────────────────────────────────────────────────────────

export interface UserStats {
  communities: number
  eventsAttended: number
  connections: number
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'moderator' | 'member'
  avatar: string
  organization: string
  joinedAt: string
  isActive: boolean
  membershipTier: 'basic' | 'pro' | 'enterprise'
  stats: UserStats
}

export interface UpdateUserPayload {
  firstName?: string
  lastName?: string
  organization?: string
  avatar?: string
}

export interface UserListParams {
  page?: number
  limit?: number
  role?: User['role']
  isActive?: boolean
  search?: string
}

export interface PaginatedUsers {
  data: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── api functions ───────────────────────────────────────────────────────────

export function getUsers(params?: UserListParams): Promise<PaginatedUsers> {
  return apiClient
    .get(API_URLS.users.list, { searchParams: { ...params } })
    .json()
}

export function getMe(): Promise<User> {
  return apiClient.get(API_URLS.users.me).json()
}

export function getUserById(id: string): Promise<User> {
  return apiClient.get(API_URLS.users.byId(id)).json()
}

export function updateMe(payload: UpdateUserPayload): Promise<User> {
  return apiClient.patch(API_URLS.users.me, { json: payload }).json()
}

export function updateUser(
  id: string,
  payload: UpdateUserPayload,
): Promise<User> {
  return apiClient.patch(API_URLS.users.byId(id), { json: payload }).json()
}

export async function deleteUser(id: string): Promise<void> {
  await apiClient.delete(API_URLS.users.byId(id))
}
