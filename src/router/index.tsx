import {
  createBrowserRouter
} from 'react-router-dom'
import { ALL_ROUTES } from '@router/subRouters'

const router = createBrowserRouter(ALL_ROUTES);

export default router

export * from './paths'
