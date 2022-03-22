import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './doMatAPI'

const initialState = {
  data: [],
  form: {
    _id: '',
    ten: '',
    errTen: null,
    isSubmitted: false,
  },
  add: false,
  edit: false,
  err: null,
}

export const getDataAsync = createAsyncThunk(
  'domat/getdata',
  async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const createDataAsync = createAsyncThunk(
  'domat/createdata',
  async (form) => {
    try {
      const response = await api.post(form);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const editDataAsync = createAsyncThunk(
  'domat/editdata',
  async (form) => {
    try {
      const response = await api.put(form._id, form);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const deleteDataAsync = createAsyncThunk(
  'domat/dalatedata',
  async (id) => {
    try {
      const response = await api.delete(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const doMatSlice = createSlice({
  name: 'domat',
  initialState,
  reducers: {
    resetErr: (state) => {
      state.err = null;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setAdd: (state, action) => {
      state.add = action.payload;
    },
    setForm: (state, action) => {
      state.form._id = action.payload._id;
      state.form.ten = action.payload.ten;
    },
    onChangeFormTen: (state, action) => {
      state.form.ten = action.payload;
    },
    resetForm: (state) => {
      state.form.ten = "";
      state.form._id = "";
      state.form.errTen = null;
      state.form.isSubmitted = false;
    },
    resetFormErr: (state, action) => {
      state.form.errTen = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 404, data: "Lỗi server" }
        }
        else
          state.data = action.payload;
      })
      .addCase(createDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code)
            state.form.errTen = "Trùng tên độ mật";
          else if (action.payload.data.errors)
            state.form.errTen = action.payload.data.errors.ten.message;
          else
            state.form.errTen = "Lỗi server"
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(editDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code)
            state.form.errTen = "Trùng tên độ mật";
          else if (action.payload.data.errors)
            state.form.errTen = action.payload.data.errors.ten.message;
          else
            state.form.errTen = "Lỗi server"
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 404, data: "Lỗi server" }
        }
      })
  }
})

export const selectDMData = state => state.dm.data;
export const selectDMEdit = state => state.dm.edit;
export const selectDMAdd = state => state.dm.add;
export const selectDMForm = state => state.dm.form;
export const selectDMErr = state => state.dm.err;

export const { resetErr, setEdit, setAdd, setForm, onChangeFormTen, resetForm, resetFormErr } = doMatSlice.actions;

export default doMatSlice.reducer;
