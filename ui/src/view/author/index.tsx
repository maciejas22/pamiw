import { Route } from '@tanstack/react-router'
import { layoutRoute } from '../../route-tree'

export const authorRoute = new Route({
  getParentRoute: () => layoutRoute,
  path: 'authors',
})
