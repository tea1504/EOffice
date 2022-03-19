import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './loaiCongVanAPI'

const initialState = {
  data: [],
  form: {
    _id: '',
    ten: '',
    viettat: '',
    errTen: null,
    errVT: null,
    isSubmitted: false,
  },
  loaicongvan: {
    ten: '',
    viettat: '',
    __v: 0,
  },
  isEdit: false,
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
);


export const editDataAsync = createAsyncThunk(
  'loaicongvan/editdata',
  async (form) => {
    try {
      const response = await api.put(form._id, form);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
);

export const deleteDataAsync = createAsyncThunk(
  'loaicongvan/deletedata',
  async (id) => {
    try {
      const response = await api.delete(id);
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
      state.form.id = "";
      state.form.ten = "";
      state.form.viettat = "";
      state.form.errTen = null;
      state.form.errVT = null;
      state.form.isSubmitted = false;
    },
    resetError: (state, action) => {
      state.err = null;
      state.form.errTen = null;
      state.form.errVT = null;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setForm: (state, action) => {
      state.form._id = action.payload._id;
      state.form.ten = action.payload.ten;
      state.form.viettat = action.payload.viettat;
    },
    setSubmittedForm: (state, action) => {
      state.form.isSubmitted = action.payload;
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
      .addCase(editDataAsync.fulfilled, (state, action) => {
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
        else {
          state.form.isSubmitted = true;
        }
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = {
              status: 404,
              data: "Không thể truy cập sever",
            }
          else
            state.err = action.payload;
        }
        else {
          state.loaicongvan = action.payload;
        }
      })
  }
});

export const selectLCVData = state => state.lcv.data;
export const selectLCVErr = state => state.lcv.err;
export const selectLCVForm = state => state.lcv.form;
export const selectLCV = state => state.lcv.loaicongvan;
export const selectLCVEdit = state => state.lcv.isEdit;

export const { onChangeTen, onChangeViettat, resetForm, resetError, setIsEdit, setForm, setSubmittedForm, } = loaiCongVanSlice.actions;

export default loaiCongVanSlice.reducer;
