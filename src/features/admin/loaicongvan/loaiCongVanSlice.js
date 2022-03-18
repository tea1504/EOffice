import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './loaiCongVanAPI'

const initialState = {
  data: [],
  err: null,
};

export const getDataAsync = createAsyncThunk(
  'loaicongvan/getdata',
  async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (err) {
      return err.response;
    }
  }
);

export const loaiCongVanSlice = createSlice({
  name: 'loaicongvan',
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

export const selectLCVData = state => state.lcv.data;
export const selectLCVErr = state => state.lcv.err;

export default loaiCongVanSlice.reducer;
