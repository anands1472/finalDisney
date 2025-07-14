import { combineReducers } from '@reduxjs/toolkit'
import sampleSlice from '../features/sampleSlice'
import stageSlice from '../features/stageSlice'
const combineReducer = combineReducers({
  sampledata: sampleSlice,
  stageData: stageSlice
})

const rootReducer = (state, action) => {
  if (
    action.type === 'userDetails/resetApplication' ||
    action.type === 'user/logout'
  ) {
    state = undefined
  }
  return combineReducer(state, action)
}

export default rootReducer
