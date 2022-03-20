import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from './doKhanAPI'

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
  'dokhan/getdata',
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
  'dokhan/createdata',
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
  'dokhan/editdata',
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
  'dokhan/deletedata',
  async (id) => {
    try {
      const response = await api.delete(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const doKhanSlice = createSlice({
  name: 'dokhan',
  initialState,
  reducers: {
    setAdd: (state, action) => {
      state.add = action.payload;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    onChangeFormTen: (state, action) => {
      state.form.ten = action.payload;
    },
    resetForm: (state, action) => {
      state.form.ten = "";
      state.form._id = "";
      state.form.errTen = null;
      state.form.isSubmitted = false;
    },
    setForm: (state, action) => {
      state.form.ten = action.payload.ten;
      state.form._id = action.payload._id;
    },
    resetFormErr: (state, action) => {
      state.form.errTen = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        if (action.payload.status)
          state.err = action.payload;
        else
          state.data = action.payload;
      })
      .addCase(createDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code)
            state.form.errTen = "Trùng tên độ khẩn";
          else if (action.payload.data.errors)
            state.form.errTen = action.payload.data.errors.ten.message;
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(editDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code)
            state.form.errTen = "Trùng tên độ khẩn";
          else if (action.payload.data.errors)
            state.form.errTen = action.payload.data.errors.ten.message;
        }
        else
          state.form.isSubmitted = true;
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
  },
})

export const selectDKData = state => state.dk.data;
export const selectDKEdit = state => state.dk.edit;
export const selectDKAdd = state => state.dk.add;
export const selectDKForm = state => state.dk.form;

export const { setAdd, setEdit, onChangeFormTen, resetForm, setForm, resetFormErr, } = doKhanSlice.actions;

export default doKhanSlice.reducer;
