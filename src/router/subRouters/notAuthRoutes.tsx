import { RouteObject } from 'react-router-dom'

import {
  HOME_PAGE, LOGIN
} from '../paths'

import { lazy } from 'react'

import NormalLayout from '@src/view/layout/NormalLayout'

const HomePage = lazy(() => import('@src/view/HomePage'));

const Login = lazy(() => import('@src/view/Login'));

export const NOT_AUTH_ROUTES:RouteObject[] = [
  {
    element: <NormalLayout />,

    children: [
      {
        path: LOGIN,
        element: <Login />,
      },
      {
        path: HOME_PAGE,
        element: <HomePage />,
      },

    ],

  }
]
