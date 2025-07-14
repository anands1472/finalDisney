import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import get from 'lodash/get'
import { HTTP_STATUS } from '../constants/httpStatus'

export const fetchStageGetCall = createAsyncThunk(
  'stageApiGetCall',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/disney/stage/stageApiGetCall`, {
        params: { target: payload?.getUrl },
        headers: payload?.headers || {}
      })

      const newData = get(response, 'data', {})
      return newData
    } catch (error) {
      const errorRes = get(error, 'response.data', {})
      return rejectWithValue(errorRes)
    }
  }
)

export const fetchStageApiCall = createAsyncThunk(
  'stageApiCall',
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/disney/stage/stageApiCall`, {
        params: { target: payload?.url },
        headers: payload?.headers || {}
      })

      const newData = get(response, 'data', {})
      if (newData && payload.getUrl) {
        dispatch(fetchStageGetCall(payload))
      }
      return newData
    } catch (error) {
      const errorRes = get(error, 'response.data', {})
      return rejectWithValue(errorRes)
    }
  }
)

export const stageSlice = createSlice({
  name: 'stageSlice',
  initialState: {
    data: [],
    apiGetResponse: null,
    status: null,
    error: null,
    renderComponent: false
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    resetData: (state, action) => {
      state.renderComponent = false
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchStageApiCall.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStageApiCall.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchStageApiCall.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      //fetchStageGetCall

      .addCase(fetchStageGetCall.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchStageGetCall.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.apiGetResponse = action.payload
        state.renderComponent = true
      })
      .addCase(fetchStageGetCall.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setData, resetData } = stageSlice.actions

export const getResponse = (state) => state?.stageData?.data
export const status = (state) => state?.stageData?.status
export const showComponent =(state) => state?.stageData?.renderComponent
export const getApiGetResponse = (state) => state?.stageData?.apiGetResponse

export default stageSlice.reducer
