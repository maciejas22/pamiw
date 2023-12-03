import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Router, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './route-tree.tsx'
import ErrorBoundary from './catch-unauthorized.tsx'

const queryClient = new QueryClient()
const router = new Router({
  routeTree,
  context: {
    queryClient,
  },
})

const rootElement = document.getElementById('root')
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement!)
  root.render(
    <StrictMode>
      <MantineProvider defaultColorScheme='dark'>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <Notifications />
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ErrorBoundary>
      </MantineProvider>
    </StrictMode>,
  )
}
