import ky from 'ky'

const TOKEN_KEY = 'nexcent_access_token'

export const apiClient = ky.create({
  prefix: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api/v1',
  timeout: 10_000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    afterResponse: [
      ({ response }) => {
        if (response.status === 401) {
          clearAuthToken()
          window.location.href = '/login'
        }
        return response
      },
    ],
  },
})

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
