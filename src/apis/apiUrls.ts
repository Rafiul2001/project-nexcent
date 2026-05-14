export const API_URLS = {
  auth: {
    login: 'auth/login',
    register: 'auth/register',
    logout: 'auth/logout',
    refresh: 'auth/refresh',
    forgotPassword: 'auth/forgot-password',
    resetPassword: 'auth/reset-password',
  },

  users: {
    list: 'users',
    me: 'users/me',
    byId: (id: string) => `users/${id}`,
  },

  blogs: {
    list: 'blogs',
    bySlug: (slug: string) => `blogs/${slug}`,
  },

  communities: {
    list: 'communities',
    byId: (id: string) => `communities/${id}`,
    join: (id: string) => `communities/${id}/join`,
    leave: (id: string) => `communities/${id}/leave`,
    members: (id: string) => `communities/${id}/members`,
  },

  events: {
    list: 'events',
    byId: (id: string) => `events/${id}`,
    register: (id: string) => `events/${id}/register`,
    unregister: (id: string) => `events/${id}/register`,
  },

  plans: {
    list: 'plans',
  },

  stats: {
    platform: 'stats',
  },

  testimonials: {
    list: 'testimonials',
  },
} as const
