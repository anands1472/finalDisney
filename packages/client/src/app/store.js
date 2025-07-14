import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import reduxLogger from '../utils/reduxLogger'
import monitorReducerEnhancer from '../utils/monitorReducerEnhancer'

const composedEnhancer = compose(
  applyMiddleware(reduxLogger),
  monitorReducerEnhancer
)

export default function appStore(preloadedState) {
  const store = configureStore({
    reducer,
    preloadedState,
    enhancer: composedEnhancer,
  })

  store.subscribe(() => {
  console.log('[STORE UPDATE]', store.getState())
})

  return store
}

