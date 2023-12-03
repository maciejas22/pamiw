import { rootRouteWithContext } from '@tanstack/react-router'
import { Layout } from './view/layout/layout.tsx'
import { QueryClient } from '@tanstack/react-query'
import { authorRoute } from './view/author'
import { authorListRoute } from './view/author/author-list.tsx'
import { bookRoute } from './view/book'
import { bookListRoute } from './view/book/book-list.tsx'
import { authorCreateRoute } from './view/author/create-author.tsx'
import { authorUpdateRoute } from './view/author/update-author.tsx'
import { bookCreateRoute } from './view/book/create-book.tsx'
import { bookUpdateRoute } from './view/book/update-book.tsx'

interface RouterContext {
  queryClient: QueryClient
}

export const layoutRoute = rootRouteWithContext<RouterContext>()({
  component: Layout,
})

export const routeTree = layoutRoute.addChildren([
  authorRoute.addChildren([
    authorListRoute,
    authorCreateRoute,
    authorUpdateRoute,
  ]),
  bookRoute.addChildren([bookListRoute, bookCreateRoute, bookUpdateRoute]),
])

declare module '@tanstack/react-router' {
  interface RouteTree {
    routeTree: typeof routeTree
  }
}
