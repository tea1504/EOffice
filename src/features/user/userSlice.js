import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  laadmin: false,
  lalanhdao: false,
  lavanthu: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  }
});

export const selectUserAdmin = state => state.user.laadmin;
export const selectUserLanhDao = state => state.user.lalanhdao;
export const selectUserVanThu = state => state.user.lavanthu;

export const { } = userSlice.actions;

export default userSlice.reducer;
