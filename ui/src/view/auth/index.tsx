import { Route } from '@tanstack/react-router'
import { layoutRoute } from '../../route-tree'

export const authRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'auth',
})
