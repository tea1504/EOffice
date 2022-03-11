import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import login from './loginApi';

const initialState = {
  ma: 'ma',
  password: 'password',
  token: 'token',
};

export const loginAsync = createAsyncThunk(
  'login/post',
  async (form) => {
    try {
      const response = await login.login(form);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeMa: (state, action) => {
      state.ma = action.payload;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const selectLoginMa = state => state.login.ma;
export const selectLoginPassword = state => state.login.password;
export const selectLoginToken = state => state.login.token;

export const { changeMa, changePassword } = loginSlice.actions;

export default loginSlice.reducer;
