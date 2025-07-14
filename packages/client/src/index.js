import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import 'whatwg-fetch'
import React from 'react'
import { createRoot } from 'react-dom/client' // ✅ CORRECT for React 18+
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider } from 'react-redux'
import appStore from './app/store'
import App from './App'
import TopNavigation from './Layout/Header/index'
import Home from './container/Home/index'

const store = appStore()

const container = document.getElementById('root')
const root = createRoot(container)

const AppLayout = () => (
  <>
    <TopNavigation />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} className="landingPage">
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} className="landingPage" />
    </Provider>
  </React.StrictMode>
)
