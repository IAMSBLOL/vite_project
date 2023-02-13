import {
  USER_CENTER
} from '../paths'
import { RouteObject } from 'react-router-dom'
// import ProtectedRoute from '@src/view/ProtectedRoute'
import { lazy } from 'react'

const ProtectedRoute = lazy(() => import('@src/view/ProtectedRoute'));
const DatasetViewerExample = lazy(() => import('@src/view/DatasetViewerExample'));

export const AUTH_ROUTES:RouteObject[] = [
  {
    path: USER_CENTER,
    element: (
      <ProtectedRoute>
        <DatasetViewerExample />
      </ProtectedRoute>
    ),
  }
]
