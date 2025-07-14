import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const ROOT_PATH = 'visionToolsSupport'

const RouteConfig = () => {
  const links = [
    {
      name: 'search',
      exact: true,
      path: `/${ROOT_PATH}/search`,
      component: lazy(() => import('./container/Search/index'))
    },
    {
      name: 'home',
      exact: true,
      path: `/${ROOT_PATH}/home`,
      component: lazy(() => import('./container/Home/index'))
    }
  ]
  return links
}

export default RouteConfig
