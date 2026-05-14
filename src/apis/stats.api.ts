import { apiClient } from './apiClient'
import { API_URLS } from './apiUrls'

// ─── types ───────────────────────────────────────────────────────────────────

export interface PlatformStats {
  members: number
  clubs: number
  eventBookings: number
  paymentsProcessed: number
}

export interface StatsGrowth {
  membersGrowthPercent: number
  clubsGrowthPercent: number
  eventBookingsGrowthPercent: number
  paymentsGrowthPercent: number
}

export interface MonthlyStats {
  month: string
  newMembers: number
  renewals: number
  events: number
}

export interface CategoryStats {
  name: string
  clubs: number
  members: number
}

export interface Stats {
  platform: PlatformStats
  growth: StatsGrowth
  monthly: MonthlyStats[]
  topCategories: CategoryStats[]
}

// ─── api functions ───────────────────────────────────────────────────────────

export function getStats(): Promise<Stats> {
  return apiClient.get(API_URLS.stats.platform).json()
}
