import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const staticRoutes = new Set(['/projects', '/about', '/skills', '/blog', '/contact'])

const cleanStaticRouteRedirects = {
  name: 'clean-static-route-redirects',
  configurePreviewServer(server) {
    server.middlewares.use((request, response, next) => {
      const [pathname, query] = (request.url || '').split('?')
      if (!pathname || pathname.endsWith('/') || !staticRoutes.has(pathname)) return next()
      response.statusCode = 308
      response.setHeader('Location', `${pathname}/${query ? `?${query}` : ''}`)
      response.end()
    })
  },
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS === 'true' ? '/portfolio/' : '/'),
  plugins: [tailwindcss(), react(), cleanStaticRouteRedirects],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
