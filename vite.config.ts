import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { devtools } from '@tanstack/devtools-vite'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import netlify from '@netlify/vite-plugin-tanstack-start'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PAGINATED_RESOURCES = new Set(['blogs', 'communities', 'events', 'users'])

const mockApiPlugin: Plugin = {
  name: 'mock-api',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = (req.url ?? '/').split('?')[0]
      if (!url.startsWith('/api/v1/')) { next(); return }

      const segment = url.slice('/api/v1/'.length).split('/')[0]
      const fileNames: Record<string, string> = {
        stats: 'stats.json',
        testimonials: 'testimonials.json',
        blogs: 'blogs.json',
        plans: 'plans.json',
        communities: 'communities.json',
        events: 'events.json',
        users: 'users.json',
      }

      const fileName = fileNames[segment]
      if (!fileName) { next(); return }

      try {
        const raw: unknown = JSON.parse(
          readFileSync(join(__dirname, 'public', 'dummyData', fileName), 'utf-8'),
        )
        const responseData =
          PAGINATED_RESOURCES.has(segment) && Array.isArray(raw)
            ? { data: raw, total: raw.length, page: 1, limit: raw.length, totalPages: 1 }
            : raw

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(responseData))
      } catch {
        next()
      }
    })
  },
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [devtools(), netlify(), tailwindcss(), tanstackStart(), viteReact(), mockApiPlugin],
  ssr: {
    noExternal: ['@react-aria', '@react-stately', '@heroui', '@internationalized'],
  },
})

export default config
