import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cookie from 'js-cookie';

import login from './loginApi';

const initialState = {
  ma: '',
  password: '',
  token: null,
  err: null,
};

export const loginAsync = createAsyncThunk(
  'login/post',
  async (form) => {
    try {
      const response = await login.login(form);
      return response.data;
    } catch (error) {
      return error.response;
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
    },
    removeToken: (state, action) => {
      state.token = null;
      cookie.remove('jwt');
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        const status = action.payload.status;
        if (status) {
          state.err = action.payload;
        }
        else {
          cookie.set('jwt', action.payload, {
            expires: 1,
          });
          state.token = action.payload
        }
      });
  },
});

export const selectLoginMa = state => state.login.ma;
export const selectLoginPassword = state => state.login.password;
export const selectLoginToken = state => {
  if (cookie.get("jwt"))
    return cookie.get("jwt");
  return state.login.token
};
export const selectLoginError = state => state.login.err;

export const { changeMa, changePassword, removeToken, setToken } = loginSlice.actions;

export default loginSlice.reducer;
