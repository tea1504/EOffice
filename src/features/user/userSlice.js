import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import user from './userApi';

const initialState = {
  laadmin: false,
  lalanhdao: false,
  lavanthu: false,
  err: null,
};

export const checkRoleAsync = createAsyncThunk(
  'user/admin',
  async () => {
    try {
      const response = await user.role();
      return response.data;
    } catch (err) {
      return err.response;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRole: (state, action) => {
      state.laadmin = false;
      state.lalanhdao = false;
      state.lavanthu = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkRoleAsync.fulfilled, (state, action) => {
        const status = action.payload.status;
        if (status) {
          state.err = action.payload;
        }
        else {
          state.laadmin = action.payload?.laadmin;
          state.lalanhdao = action.payload?.lalanhdao;
          state.lavanthu = action.payload?.lavanthu;
        }
      });
  },
});

export const selectUserAdmin = state => state.user.laadmin;
export const selectUserLanhDao = state => state.user.lalanhdao;
export const selectUserVanThu = state => state.user.lavanthu;

export const { resetRole } = userSlice.actions;

export default userSlice.reducer;
