import type { UpdateUserPayload, UserListParams } from '#/apis/users.api'
import {
  deleteUser,
  getMe,
  getUserById,
  getUsers,
  updateMe,
  updateUser,
} from '#/apis/users.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const userKeys = {
  all: ['users'] as const,
  list: (params?: UserListParams) => [...userKeys.all, 'list', params] as const,
  me: () => ['me'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
}

export function useUsers(params?: UserListParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsers(params),
  })
}

export function useMe() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserById(id),
    enabled: !!id,
  })
}

export function useUpdateMe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateUserPayload) => updateMe(payload),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.me(), updatedUser)
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserPayload }) =>
      updateUser(id, payload),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser)
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: userKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
