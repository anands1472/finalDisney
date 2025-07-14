import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import get from 'lodash/get'
import { HTTP_STATUS } from '../constants/httpStatus'

export const fetchSample = createAsyncThunk(
  'sample',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/disney/lookup/metaData`)
      const newData = get(response, 'data')
      return newData
    } catch (error) {
      const errorRes = get(error, 'response.data.response', {})
      return rejectWithValue(errorRes)
    }
  }
)

export const sampleSlice = createSlice({
  name: 'sample',
  initialState: {
    data: [],
    status: null,
    error: null
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSample.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSample.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchSample.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { setData } = sampleSlice.actions

export const getMetaData = (state) => state?.sampledata?.data

export default sampleSlice.reducer
