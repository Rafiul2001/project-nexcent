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

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await fetch('/dummyData/testimonials.json')
  return res.json() as Promise<Testimonial[]>
}
