import { getTestimonials } from '#/apis/testimonials.api'
import { useQuery } from '@tanstack/react-query'

export const testimonialKeys = {
  all: ['testimonials'] as const,
  list: () => [...testimonialKeys.all, 'list'] as const,
}

export function useTestimonials() {
  return useQuery({
    queryKey: testimonialKeys.list(),
    queryFn: getTestimonials,
    staleTime: 10 * 60 * 1000,
  })
}
