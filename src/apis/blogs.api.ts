import { apiClient } from './apiClient'
import { API_URLS } from './apiUrls'

// ─── types ───────────────────────────────────────────────────────────────────

export interface BlogAuthor {
  name: string
  avatar: string
}

export interface Blog {
  id: string
  image: string
  title: string
  slug: string
  category: string
  author: BlogAuthor
  publishedAt: string
  readTimeMinutes: number
  excerpt: string
  tags: string[]
}

export interface BlogListParams {
  page?: number
  limit?: number
  category?: string
  tag?: string
  search?: string
}

export interface PaginatedBlogs {
  data: Blog[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// ─── api functions ───────────────────────────────────────────────────────────

export function getBlogs(params?: BlogListParams): Promise<PaginatedBlogs> {
  return apiClient
    .get(API_URLS.blogs.list, { searchParams: { ...params } })
    .json()
}

export function getBlogBySlug(slug: string): Promise<Blog> {
  return apiClient.get(API_URLS.blogs.bySlug(slug)).json()
}
