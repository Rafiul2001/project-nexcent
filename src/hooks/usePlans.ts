import { getPlans } from '#/apis/plans.api'
import { useQuery } from '@tanstack/react-query'

export const planKeys = {
  all: ['plans'] as const,
  list: () => [...planKeys.all, 'list'] as const,
}

export function usePlans() {
  return useQuery({
    queryKey: planKeys.list(),
    queryFn: getPlans,
    staleTime: 10 * 60 * 1000,
  })
}
