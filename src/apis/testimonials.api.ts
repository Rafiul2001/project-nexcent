import { apiClient } from './apiClient'
import { API_URLS } from './apiUrls'

// ─── types ───────────────────────────────────────────────────────────────────

export interface TestimonialAuthor {
  name: string
  title: string
  organization: string
  avatar: string
}

export interface Testimonial {
  id: string
  quote: string
  author: TestimonialAuthor
  rating: number
  featured: boolean
}

// ─── api functions ───────────────────────────────────────────────────────────

export function getTestimonials(): Promise<Testimonial[]> {
  return apiClient.get(API_URLS.testimonials.list).json()
}
