import type { BlogListParams } from '#/apis/blogs.api'
import { getBlogBySlug, getBlogs } from '#/apis/blogs.api'
import { useQuery } from '@tanstack/react-query'

export const blogKeys = {
  all: ['blogs'] as const,
  list: (params?: BlogListParams) => [...blogKeys.all, 'list', params] as const,
  detail: (slug: string) => [...blogKeys.all, 'detail', slug] as const,
}

export function useBlogs(params?: BlogListParams) {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: () => getBlogs(params),
  })
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  })
}
