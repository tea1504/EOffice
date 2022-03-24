import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './donViAPI'

const initialState = {
  data: [],
  form: {
    _id: '',
    ten: '',
    email: '',
    errTen: null,
    errEmail: null,
    isSubmitted: false,
  },
  add: false,
  edit: false,
  err: null,
}

export const getDataAsync = createAsyncThunk(
  'donvi/getdata',
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
  'donvi/createdata',
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
  'donvi/editdata',
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
  'donvi/dalatedata',
  async (id) => {
    try {
      const response = await api.delete(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const donViSlice = createSlice({
  name: 'donvi',
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
      state.form.email = action.payload.email;
    },
    resetForm: (state) => {
      state.form.ten = "";
      state.form.email = "";
      state.form._id = "";
      state.form.errTen = null;
      state.form.errEmail = null;
      state.form.isSubmitted = false;
    },
    onChangeFormTen: (state, action) => {
      state.form.ten = action.payload;
    },
    onChangeFormEmail: (state, action) => {
      state.form.email = action.payload;
    },
    resetFormErr: (state) => {
      state.form.errTen = null;
      state.form.errEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else
          state.data = action.payload;
      })
      .addCase(createDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code) {
            state.form.errEmail = "Email đơn vị bị trùng";
          }
          else if (action.payload.data.errors) {
            state.form.errTen = action.payload.data.errors.ten?.message;
            state.form.errEmail = action.payload.data.errors.email?.message;
          }
          else
            state.form.errTen = "Lỗi server"
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(editDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code)
            state.form.errEmail = "Email đơn vị bị trùng";
          else if (action.payload.data.errors) {
            state.form.errTen = action.payload.data.errors.ten?.message;
            state.form.errEmail = action.payload.data.errors.email?.message;
          }
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

export const selectDVData = state => state.dv.data;
export const selectDVEdit = state => state.dv.edit;
export const selectDVAdd = state => state.dv.add;
export const selectDVForm = state => state.dv.form;
export const selectDVErr = state => state.dv.err;

export const { resetErr, setAdd, setEdit, resetForm, onChangeFormTen, onChangeFormEmail, resetFormErr, setForm } = donViSlice.actions;

export default donViSlice.reducer;