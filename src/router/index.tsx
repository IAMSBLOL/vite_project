import {
  createBrowserRouter
} from 'react-router-dom'
import { homePageRoute } from '@router/subRouters'

const router = createBrowserRouter([
  homePageRoute
]);

export default router

export * from './paths'
