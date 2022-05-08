import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './canBoAPI'

const initialState = {
  data: [],
  form: {
    _id: '',
    ten: '',
    donvi: '',
    tendonvi: '',
    ma: '',
    holot: '',
    email: '',
    sdt: '',
    matkhau: '12345',
    laadmin: false,
    lalanhdao: false,
    lavanthu: false,
    actived: false,
    errTen: null,
    errDonVi: null,
    errMa: null,
    errHoLot: null,
    errEmail: null,
    errsdt: null,
    isSubmitted: false,
  },
  add: false,
  edit: false,
  detail: false,
  err: null,
}

export const getDataAsync = createAsyncThunk(
  'canbo/getdata',
  async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getDuLieuTheoUserAsync = createAsyncThunk(
  'canbo/getdulieutheouser',
  async () => {
    try {
      const response = await api.getDuLieuTheoUser();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getDataLanhDaoAsync = createAsyncThunk(
  'canbo/getdatalanhdao',
  async () => {
    try {
      const response = await api.getLanhDao();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const createDataAsync = createAsyncThunk(
  'canbo/createdata',
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
  'canbo/editdata',
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
  'canbo/deletedata',
  async (id) => {
    try {
      const response = await api.delete(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const lockDataAsync = createAsyncThunk(
  'canbo/lockdata',
  async (id) => {
    try {
      const response = await api.lock(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const canBoSlice = createSlice({
  name: 'canbo',
  initialState,
  reducers: {
    reset: () => initialState,
    resetErr: (state) => {
      state.err = null;
    },
    setEdit: (state, action) => {
      state.edit = action.payload;
    },
    setAdd: (state, action) => {
      state.add = action.payload;
    },
    setDetail: (state, action) => {
      state.detail = action.payload;
    },
    setForm: (state, action) => {
      state.form._id = action.payload._id;
      state.form.ma = action.payload.ma;
      state.form.ten = action.payload.ten;
      state.form.donvi = action.payload.donvi._id;
      state.form.tendonvi = action.payload.donvi.ten;
      state.form.holot = action.payload.holot;
      state.form.email = action.payload.email;
      state.form.sdt = action.payload.sdt;
      state.form.laadmin = action.payload.laadmin;
      state.form.lalanhdao = action.payload.lalanhdao;
      state.form.lavanthu = action.payload.lavanthu;
      state.form.actived = action.payload.actived;
    },
    onChangeFormTen: (state, action) => {
      state.form.ten = action.payload;
    },
    onChangeFormMa: (state, action) => {
      state.form.ma = action.payload;
    },
    onChangeFormDonVi: (state, action) => {
      state.form.donvi = action.payload;
    },
    onChangeFormHoLot: (state, action) => {
      state.form.holot = action.payload;
    },
    onChangeFormEmail: (state, action) => {
      state.form.email = action.payload;
    },
    onChangeFormSdt: (state, action) => {
      state.form.sdt = action.payload;
    },
    toggleAdmin: (state, action) => {
      state.form.laadmin = action.payload;
    },
    toggleLanhDao: (state, action) => {
      state.form.lalanhdao = action.payload;
    },
    toggleVanThu: (state, action) => {
      state.form.lavanthu = action.payload;
    },
    toggleActived: (state, action) => {
      state.form.actived = action.payload;
    },
    resetForm: (state) => {
      state.form.ten = "";
      state.form._id = "";
      state.form.donvi = "";
      state.form.ma = "";
      state.form.holot = "";
      state.form.email = "";
      state.form.sdt = "";
      state.form.laadmin = false;
      state.form.lalanhdao = false;
      state.form.lavanthu = false;
      state.form.actived = false;
      state.form.errTen = null;
      state.form.errDonVi = null;
      state.form.errMa = null;
      state.form.errHoLot = null;
      state.form.errEmail = null;
      state.form.errsdt = null;
      state.form.isSubmitted = false;
    },
    resetFormErr: (state) => {
      state.form.errTen = null;
      state.form.errDonVi = null;
      state.form.errMa = null;
      state.form.errHoLot = null;
      state.form.errEmail = null;
      state.form.errsdt = null;
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
      .addCase(getDuLieuTheoUserAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else
          state.data = action.payload;
      })
      .addCase(getDataLanhDaoAsync.fulfilled, (state, action) => {
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
            if (action.payload.data.keyPattern.email)
              state.form.errEmail = action.payload.data.keyValue.email + " bị trùng";
            if (action.payload.data.keyPattern.ma)
              state.form.errMa = action.payload.data.keyValue.ma + " bị trùng";
            if (action.payload.data.keyPattern.sdt)
              state.form.errsdt = action.payload.data.keyValue.sdt + " bị trùng";
          }
          else if (action.payload.data.errors) {
            state.form.errMa = action.payload.data.errors.ma?.message;
            state.form.errHoLot = action.payload.data.errors.holot?.message;
            state.form.errTen = action.payload.data.errors.ten?.message;
            state.form.errEmail = action.payload.data.errors.email?.message;
            state.form.errsdt = action.payload.data.errors.sdt?.message;
            state.form.errDonVi = action.payload.data.errors.donvi ? "Bạn phải chọn đơn vị" : null;
          }
          else
            state.form.errTen = "Lỗi server"
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(editDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code) {
            if (action.payload.data.keyPattern.email)
              state.form.errEmail = action.payload.data.keyValue.email + " bị trùng";
            if (action.payload.data.keyPattern.ma)
              state.form.errMa = action.payload.data.keyValue.ma + " bị trùng";
            if (action.payload.data.keyPattern.sdt)
              state.form.errsdt = action.payload.data.keyValue.sdt + " bị trùng";
          }
          else if (action.payload.data.errors) {
            state.form.errMa = action.payload.data.errors.ma?.message;
            state.form.errHoLot = action.payload.data.errors.holot?.message;
            state.form.errTen = action.payload.data.errors.ten?.message;
            state.form.errEmail = action.payload.data.errors.email?.message;
            state.form.errsdt = action.payload.data.errors.sdt?.message;
            state.form.errDonVi = action.payload.data.errors.donvi ? "Bạn phải chọn đơn vị" : null;
          }
          else
            state.err = { status: action.payload.data.code, data: action.payload.data }
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(lockDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          state.err = { status: 401, data: action.payload.data }
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
      })
  }
})

export const selectCBData = state => state.cb.data;
export const selectCBEdit = state => state.cb.edit;
export const selectCBDetail = state => state.cb.detail;
export const selectCBAdd = state => state.cb.add;
export const selectCBForm = state => state.cb.form;
export const selectCBErr = state => state.cb.err;

export const { reset, resetErr, setDetail, setEdit, setAdd, setForm, onChangeFormTen, resetForm, resetFormErr, onChangeFormDonVi, onChangeFormEmail, onChangeFormMa, onChangeFormHoLot, onChangeFormSdt, toggleAdmin, toggleLanhDao, toggleVanThu, toggleActived } = canBoSlice.actions;

export default canBoSlice.reducer;
