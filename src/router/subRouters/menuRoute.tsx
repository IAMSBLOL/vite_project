import {
  homePage
} from '../paths'

import { lazy } from 'react'

const DatasetViewerExample = lazy(() => import('@src/view/DatasetViewerExample'));

export const homePageRoute = {
  path: homePage,
  element: <DatasetViewerExample />,
}
