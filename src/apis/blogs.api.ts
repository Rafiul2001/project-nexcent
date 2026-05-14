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

export async function getBlogs(params?: BlogListParams): Promise<PaginatedBlogs> {
  const res = await fetch('/dummyData/blogs.json')
  const all: Blog[] = await res.json()

  const page = params?.page ?? 1
  const limit = params?.limit ?? all.length
  const start = (page - 1) * limit
  const data = all.slice(start, start + limit)

  return { data, total: all.length, page, limit, totalPages: Math.ceil(all.length / limit) }
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  const res = await fetch('/dummyData/blogs.json')
  const all: Blog[] = await res.json()
  const blog = all.find((b) => b.slug === slug)
  if (!blog) throw new Error(`Blog not found: ${slug}`)
  return blog
}
