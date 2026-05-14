import type {
  CommunityListParams,
  CreateCommunityPayload,
  UpdateCommunityPayload,
} from '#/apis/communities.api'
import {
  createCommunity,
  deleteCommunity,
  getCommunities,
  getCommunityById,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
} from '#/apis/communities.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const communityKeys = {
  all: ['communities'] as const,
  list: (params?: CommunityListParams) =>
    [...communityKeys.all, 'list', params] as const,
  detail: (id: string) => [...communityKeys.all, 'detail', id] as const,
}

export function useCommunities(params?: CommunityListParams) {
  return useQuery({
    queryKey: communityKeys.list(params),
    queryFn: () => getCommunities(params),
  })
}

export function useCommunity(id: string) {
  return useQuery({
    queryKey: communityKeys.detail(id),
    queryFn: () => getCommunityById(id),
    enabled: !!id,
  })
}

export function useCreateCommunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCommunityPayload) => createCommunity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityKeys.all })
    },
  })
}

export function useUpdateCommunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateCommunityPayload
    }) => updateCommunity(id, payload),
    onSuccess: (updated) => {
      queryClient.setQueryData(communityKeys.detail(updated.id), updated)
      queryClient.invalidateQueries({ queryKey: communityKeys.all })
    },
  })
}

export function useDeleteCommunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCommunity(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: communityKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: communityKeys.all })
    },
  })
}

export function useJoinCommunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => joinCommunity(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: communityKeys.detail(id) })
    },
  })
}

export function useLeaveCommunity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => leaveCommunity(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: communityKeys.detail(id) })
    },
  })
}
