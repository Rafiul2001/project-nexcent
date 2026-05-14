// ─── types ───────────────────────────────────────────────────────────────────

export interface PlanPrice {
  monthly: number
  annually: number
  currency: string
}

export interface PlanFeature {
  label: string
  included: boolean
}

export interface Plan {
  id: string
  name: string
  tagline: string
  price: PlanPrice
  isFree: boolean
  isPopular: boolean
  features: PlanFeature[]
  cta: string
  ctaHref: string
}

// ─── api functions ───────────────────────────────────────────────────────────

export async function getPlans(): Promise<Plan[]> {
  const res = await fetch('/dummyData/plans.json')
  return res.json() as Promise<Plan[]>
}
