import type {
  CreateEventPayload,
  EventListParams,
  UpdateEventPayload,
} from '#/apis/events.api'
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEvents,
  registerForEvent,
  unregisterFromEvent,
  updateEvent,
} from '#/apis/events.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const eventKeys = {
  all: ['events'] as const,
  list: (params?: EventListParams) =>
    [...eventKeys.all, 'list', params] as const,
  detail: (id: string) => [...eventKeys.all, 'detail', id] as const,
}

export function useEvents(params?: EventListParams) {
  return useQuery({
    queryKey: eventKeys.list(params),
    queryFn: () => getEvents(params),
  })
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => getEventById(id),
    enabled: !!id,
  })
}

export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => createEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all })
    },
  })
}

export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateEventPayload
    }) => updateEvent(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(eventKeys.detail(updated.id), updated)
      queryClient.invalidateQueries({ queryKey: eventKeys.all })
    },
  })
}

export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: eventKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: eventKeys.all })
    },
  })
}

export function useRegisterForEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => registerForEvent(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(id) })
    },
  })
}

export function useUnregisterFromEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => unregisterFromEvent(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(id) })
    },
  })
}
