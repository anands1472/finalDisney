// import React, { Suspense, Fragment, memo, useEffect } from 'react'
// import { Switch, Route, useHistory } from 'react-router-dom'
// import LoadingScreen from './components/LoadingScreen'
// import RoutesConfig from './RoutesConfig'
// import { envConfig } from './config/env/envConfig'

// const generalProps = {
//   contextRoot: envConfig.CONTEXT_ROOT,
//   view: 'home'
// }

// const renderRoutes = (routes, layoutProps) =>
//   routes ? (
//     <Suspense fallback={<LoadingScreen size={60} thickness={2} />}>
//       <Switch>
//         {routes.map((route, i) => {
//           const Component = route.component
//           return (
//             <Route
//               key={i}
//               path={route.path}
//               exact={route.exact}
//               render={(props) => (
//                 <>
//                   {route.routes ? (
//                     renderRoutes(route.routes)
//                   ) : (
//                     <Component {...props} />
//                   )}
//                 </>
//               )}
//             />
//           )
//         })}
//       </Switch>
//     </Suspense>
//   ) : null

// const Routes = memo(() => {
//   const defaultRoutes = RoutesConfig()

//   return renderRoutes(defaultRoutes)
// })

// export default Routes
