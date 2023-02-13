
import { NOT_AUTH_ROUTES } from './notAuthRoutes'

import { AUTH_ROUTES } from './authRoutes'

export const ALL_ROUTES = [
  ...NOT_AUTH_ROUTES,
  ...AUTH_ROUTES
]
