import { Route } from '@tanstack/react-router'
import { layoutRoute } from '../../route-tree'

export const bookRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'books',
})
