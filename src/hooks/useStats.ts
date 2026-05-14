import { getStats } from '#/apis/stats.api'
import { useQuery } from '@tanstack/react-query'

export const statsKeys = {
  all: ['stats'] as const,
  platform: () => [...statsKeys.all, 'platform'] as const,
}

export function useStats() {
  return useQuery({
    queryKey: statsKeys.platform(),
    queryFn: getStats,
    staleTime: 5 * 60 * 1000,
  })
}
