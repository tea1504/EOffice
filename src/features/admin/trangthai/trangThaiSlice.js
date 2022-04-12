import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './trangThaiAPI'

const initialState = {
  data: [],
};

export const getDataAsync = createAsyncThunk(
  'trangthai/getdata',
  async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const trangThaiSlice = createSlice({
  name: 'trangthai',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        const status = action.payload.status;
        if (status) {
          state.err = action.payload;
        }
        else {
          state.data = action.payload
        }
      })
  }
});

export const selectTTData = state => state.tt.data;

export default trangThaiSlice.reducer;
