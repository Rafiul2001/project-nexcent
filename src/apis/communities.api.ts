import { apiClient } from './apiClient'
import { API_URLS } from './apiUrls'

// ─── types ───────────────────────────────────────────────────────────────────

export type CommunityType =
  | 'membership-organisation'
  | 'national-association'
  | 'club'

export interface CommunityContact {
  website: string
  email: string
}

export interface Community {
  id: string
  name: string
  slug: string
  type: CommunityType
  category: string
  logo: string
  coverImage: string
  description: string
  memberCount: number
  clubCount: number
  location: string
  founded: number
  isVerified: boolean
  isPublic: boolean
  tags: string[]
  contact: CommunityContact
}

export interface CreateCommunityPayload {
  name: string
  type: CommunityType
  category: string
  description: string
  location: string
  isPublic?: boolean
  tags?: string[]
  contact: CommunityContact
}

export interface UpdateCommunityPayload extends Partial<CreateCommunityPayload> {}

export interface CommunityListParams {
  page?: number
  limit?: number
  type?: CommunityType
  category?: string
  search?: string
}

export interface PaginatedCommunities {
  data: Community[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── api functions ───────────────────────────────────────────────────────────

export function getCommunities(
  params?: CommunityListParams,
): Promise<PaginatedCommunities> {
  return apiClient
    .get(API_URLS.communities.list, { searchParams: { ...params } })
    .json()
}

export function getCommunityById(id: string): Promise<Community> {
  return apiClient.get(API_URLS.communities.byId(id)).json()
}

export function createCommunity(
  payload: CreateCommunityPayload,
): Promise<Community> {
  return apiClient.post(API_URLS.communities.list, { json: payload }).json()
}

export function updateCommunity(
  id: string,
  payload: UpdateCommunityPayload,
): Promise<Community> {
  return apiClient
    .patch(API_URLS.communities.byId(id), { json: payload })
    .json()
}

export async function deleteCommunity(id: string): Promise<void> {
  await apiClient.delete(API_URLS.communities.byId(id))
}

export async function joinCommunity(id: string): Promise<void> {
  await apiClient.post(API_URLS.communities.join(id))
}

export async function leaveCommunity(id: string): Promise<void> {
  await apiClient.delete(API_URLS.communities.leave(id))
}
