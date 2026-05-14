import { apiClient } from './apiClient'
import { API_URLS } from './apiUrls'

// ─── types ───────────────────────────────────────────────────────────────────

export type EventType =
  | 'competition'
  | 'workshop'
  | 'festival'
  | 'training'
  | 'webinar'
  | 'meetup'
export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'cancelled'

export interface EventLocation {
  name: string
  city: string
  country: string
}

export interface EventPrice {
  amount: number
  currency: string
  isFree: boolean
}

export interface Event {
  id: string
  title: string
  slug: string
  communityId: string
  communityName: string
  type: EventType
  status: EventStatus
  image: string
  description: string
  location: EventLocation
  startDate: string
  endDate: string
  capacity: number
  registeredCount: number
  price: EventPrice
  tags: string[]
}

export interface CreateEventPayload {
  title: string
  communityId: string
  type: EventType
  description: string
  location: EventLocation
  startDate: string
  endDate: string
  capacity: number
  price: EventPrice
  tags?: string[]
}

export interface UpdateEventPayload extends Partial<CreateEventPayload> {}

export interface EventListParams {
  page?: number
  limit?: number
  type?: EventType
  status?: EventStatus
  communityId?: string
  search?: string
}

export interface PaginatedEvents {
  data: Event[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── api functions ───────────────────────────────────────────────────────────

export function getEvents(params?: EventListParams): Promise<PaginatedEvents> {
  return apiClient
    .get(API_URLS.events.list, { searchParams: { ...params } })
    .json()
}

export function getEventById(id: string): Promise<Event> {
  return apiClient.get(API_URLS.events.byId(id)).json()
}

export function createEvent(payload: CreateEventPayload): Promise<Event> {
  return apiClient.post(API_URLS.events.list, { json: payload }).json()
}

export function updateEvent(
  id: string,
  payload: UpdateEventPayload,
): Promise<Event> {
  return apiClient.patch(API_URLS.events.byId(id), { json: payload }).json()
}

export async function deleteEvent(id: string): Promise<void> {
  await apiClient.delete(API_URLS.events.byId(id))
}

export async function registerForEvent(id: string): Promise<void> {
  await apiClient.post(API_URLS.events.register(id))
}

export async function unregisterFromEvent(id: string): Promise<void> {
  await apiClient.delete(API_URLS.events.unregister(id))
}
