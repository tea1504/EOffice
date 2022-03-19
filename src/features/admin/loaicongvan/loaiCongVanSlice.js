import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './loaiCongVanAPI'

const initialState = {
  data: [],
  form: {
    ten: '',
    viettat: '',
    errTen: null,
    errVT: null,
    isSubmitted: false,
  },
  err: null,
};

export const getDataAsync = createAsyncThunk(
  'loaicongvan/getdata',
  async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const createDataAsync = createAsyncThunk(
  'loaicongvan/createdata',
  async (form) => {
    try {
      const response = await api.post(form);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const loaiCongVanSlice = createSlice({
  name: 'loaicongvan',
  initialState,
  reducers: {
    onChangeTen: (state, action) => {
      state.form.ten = action.payload;
    },
    onChangeViettat: (state, action) => {
      state.form.viettat = action.payload;
    },
    resetForm: (state, action) => {
      state.form.ten = "";
      state.form.viettat = "";
      state.form.errTen = null;
      state.form.errVT = null;
      state.form.isSubmitted = false;
    }
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
      .addCase(createDataAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.status) {
          if (action.payload.data) {
            if (action.payload.data.errors) {
              state.form.errTen = action.payload.data.errors.ten.message;
              state.form.errVT = action.payload.data.errors.viettat.message;
            }
            else if (action.payload.data.code === 11000) {
              state.form.errVT = "Tên viết tắt bị trùng";
            }
          }
        }
        else
          state.form.isSubmitted = true;
      })
  }
});

export const selectLCVData = state => state.lcv.data;
export const selectLCVErr = state => state.lcv.err;
export const selectLCVForm = state => state.lcv.form;

export const { onChangeTen, onChangeViettat, resetForm } = loaiCongVanSlice.actions;

export default loaiCongVanSlice.reducer;
