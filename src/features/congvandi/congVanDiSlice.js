import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from './congVanDiAPI'

const initialState = {
  data: [],
  form: {
    _id: '',
    so: '',
    dv_nhan: [],
    loaicongvan: '',
    cb_nhap: '',
    trangthai: '',
    domat: '',
    dokhan: '',
    ngay: '',
    hieuluc: '',
    trichyeu: '',
    nguoiky: '',
    chucvu_nguoiky: '',
    soto: '',
    noiluu: '',
    ghichu: '',
    hantraloi: '',
    ngaydi: '',
    taptin: [],
    email_nd: '',
    email_title: '',
    email_send: false,
    errso: null,
    errdv_nhan: null,
    errloaicongvan: null,
    errcb_nhap: null,
    errtrangthai: null,
    errdomat: null,
    errdokhan: null,
    errngay: null,
    errhieuluc: null,
    errtrichyeu: null,
    errnguoiky: null,
    errchucvu_nguoiky: null,
    errsoto: null,
    errnoiluu: null,
    errghichu: null,
    errhantraloi: null,
    errngaydi: null,
    errtaptin: null,
    isSubmitted: false,
  },
  err: null
}

export const getDataAsync = createAsyncThunk(
  'congvandi/getdata',
  async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getSimpleDetailDataAsync = createAsyncThunk(
  'congvandi/getsimpledata',
  async (id) => {
    try {
      const response = await api.getSimpleDetail(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getDetailDataAsync = createAsyncThunk(
  'congvandi/getdetaildata',
  async (id) => {
    try {
      const response = await api.getDetail(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const createDataAsync = createAsyncThunk(
  'congvandi/createdata',
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
  'congvandi/editdata',
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
  'congvandi/deletedata',
  async (id) => {
    try {
      const response = await api.delete(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const congVanDiSlice = createSlice({
  name: 'congvandi',
  initialState,
  reducers: {
    reset: () => initialState,
    onChangeFormSo: (state, action) => {
      state.form.so = action.payload;
    },
    onChangeFormDVPhatHanh: (state, action) => {
      state.form.dv_phathanh = action.payload;
    },
    setCBNhap: (state, action) => {
      state.form.cb_nhap = action.payload;
    },
    onChangeFormLCV: (state, action) => {
      state.form.loaicongvan = action.payload;
    },
    onChangeFormDM: (state, action) => {
      state.form.domat = action.payload;
    },
    onChangeFormDK: (state, action) => {
      state.form.dokhan = action.payload;
    },
    onChangeFormNgay: (state, action) => {
      state.form.ngay = action.payload;
    },
    onChangeFormHieuLuc: (state, action) => {
      state.form.hieuluc = action.payload;
    },
    onChangeFormTrichYeu: (state, action) => {
      state.form.trichyeu = action.payload;
    },
    onChangeFormNGuoiKy: (state, action) => {
      state.form.nguoiky = action.payload;
    },
    onChangeFormChucVuNguoiKy: (state, action) => {
      state.form.chucvu_nguoiky = action.payload;
    },
    onChangeFormSoTo: (state, action) => {
      state.form.soto = action.payload;
    },
    onChangeFormNoiLuu: (state, action) => {
      state.form.noiluu = action.payload;
    },
    onChangeFormGhiChu: (state, action) => {
      state.form.ghichu = action.payload;
    },
    onChangeFormNgayDi: (state, action) => {
      state.form.ngaydi = action.payload;
    },
    onChangeFormHanTraLoi: (state, action) => {
      state.form.hantraloi = action.payload;
    },
    onChangeFormTrangThai: (state, action) => {
      state.form.trangthai = action.payload;
    },
    onChangeFormTapTin: (state, action) => {
      state.form.taptin = action.payload;
    },
    onChangeFormCBDuyet: (state, action) => {
      state.form.cb_pheduyet = action.payload;
    },
    onChangeFormCBTrangThai: (state, action) => {
      state.form.trangthai = action.payload;
    },
    onChangeFormDVNhan: (state, action) => {
      state.form.dv_nhan = action.payload.map(el => el._id);
    },
    onChangeFormEmailND: (state, action) => {
      state.form.email_nd = action.payload;
    },
    onChangeFormEmailTitle: (state, action) => {
      state.form.email_title = action.payload;
    },
    onChangeFormEmailSend: (state, action) => {
      state.form.email_send = action.payload;
    },
    resetFormErr: (state) => {
      state.form.errchucvu_nguoiky = null;
      state.form.errdokhan = null;
      state.form.errdomat = null;
      state.form.errdv_nhan = null;
      state.form.errdv_phathanh = null;
      state.form.errloaicongvan = null;
      state.form.errngay = null;
      state.form.errnguoiky = null;
      state.form.errnoiluu = null;
      state.form.errso = null;
      state.form.errsoto = null;
      state.form.errtaptin = null;
      state.form.errtrangthai = null;
      state.form.errtrichyeu = null;
      state.form.errngayden = null;
    },
    resetForm: (state) => {
      state.form._id = '';
      state.form.so = '';
      state.form.dv_nhan = [];
      state.form.loaicongvan = '';
      state.form.cb_nhap = '';
      state.form.cb_pheduyet = '';
      state.form.trangthai = '';
      state.form.domat = '';
      state.form.dokhan = '';
      state.form.ngay = '';
      state.form.hieuluc = '';
      state.form.trichyeu = '';
      state.form.nguoiky = '';
      state.form.chucvu_nguoiky = '';
      state.form.soto = '';
      state.form.noiluu = '';
      state.form.ghichu = '';
      state.form.hantraloi = '';
      state.form.ngaydi = '';
      state.form.taptin = [];
      state.form.isSubmitted = false;
      state.form.email_nd= '';
      state.form.email_title= '';
      state.form.email_send= false;
    },
    formatDate: (state) => {
      const formatdate = (ngay) => {
        if (!ngay) return "";
        var date = new Date(ngay);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dt = date.getDate();

        if (dt < 10) {
          dt = "0" + dt;
        }
        if (month < 10) {
          month = "0" + month;
        }
        return year + "-" + month + "-" + dt;
      };
      state.form.ngay = formatdate(state.form.ngay);
      state.form.ngaydi = formatdate(state.form.ngaydi);
      state.form.hieuluc = formatdate(state.form.hieuluc);
      state.form.hantraloi = formatdate(state.form.hangiaiquyet);
    },
    resetTapTin: (state) => {
      state.form.taptin = [];
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
      .addCase(getDetailDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else {
          state.form = action.payload;
        }
      })
      .addCase(getSimpleDetailDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else {
          state.form = action.payload;
        }
      })
      .addCase(createDataAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.data.code) {
            //Lỗi unique
            if (action.payload.data.keyPattern.so)
              state.form.errso = action.payload.data.keyValue.so + " bị trùng";
          }
          else if (action.payload.data.errors) {
            state.form.errchucvu_nguoiky = action.payload.data.errors.chucvu_nguoiky?.message;
            state.form.errdokhan = action.payload.data.errors.dokhan ? "Bạn phải chọn độ khẩn" : null;
            state.form.errdomat = action.payload.data.errors.domat ? "Bạn phải chọn độ mật" : null;
            state.form.errdv_nhan = action.payload.data.errors.dv_nhan ? "Bạn phải chọn đơn vị nhận" : null;
            state.form.errloaicongvan = action.payload.data.errors.loaicongvan ? "Bạn phải chọn loại công văn" : null;
            state.form.errngay = action.payload.data.errors.ngay?.message;
            state.form.errnguoiky = action.payload.data.errors.nguoiky?.message;
            state.form.errnoiluu = action.payload.data.errors.noiluu?.message;
            state.form.errso = action.payload.data.errors.so?.message;
            state.form.errsoto = action.payload.data.errors.soto?.message;
            state.form.errtaptin = action.payload.data.errors.taptin?.message;
            state.form.errtrangthai = action.payload.data.errors.trangthai ? "Bạn phải chọn trạng thái" : null;
            state.form.errtrichyeu = action.payload.data.errors.trichyeu?.message;
            state.form.errngaydi = action.payload.data.errors.ngaydi?.message;
          }
          else
            state.err = {
              status: 500,
              data: "Lỗi server"
            }
        }
        else
          state.form.isSubmitted = true;
      })
      .addCase(editDataAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.status) {
          if (action.payload.data.code) {
            //Lỗi unique
            if (action.payload.data.keyPattern.so)
              state.form.errso = action.payload.data.keyValue.so + " bị trùng";
          }
          else if (action.payload.data.errors) {
            state.form.errchucvu_nguoiky = action.payload.data.errors.chucvu_nguoiky?.message;
            state.form.errdokhan = action.payload.data.errors.dokhan ? "Bạn phải chọn độ khẩn" : null;
            state.form.errdomat = action.payload.data.errors.domat ? "Bạn phải chọn độ mật" : null;
            state.form.errdv_nhan = action.payload.data.errors.dv_nhan ? "Bạn phải chọn đơn vị nhận" : null;
            state.form.errloaicongvan = action.payload.data.errors.loaicongvan ? "Bạn phải chọn loại công văn" : null;
            state.form.errngay = action.payload.data.errors.ngay?.message;
            state.form.errnguoiky = action.payload.data.errors.nguoiky?.message;
            state.form.errnoiluu = action.payload.data.errors.noiluu?.message;
            state.form.errso = action.payload.data.errors.so?.message;
            state.form.errsoto = action.payload.data.errors.soto?.message;
            state.form.errtaptin = action.payload.data.errors.taptin?.message;
            state.form.errtrangthai = action.payload.data.errors.trangthai ? "Bạn phải chọn trạng thái" : null;
            state.form.errtrichyeu = action.payload.data.errors.trichyeu?.message;
            state.form.errngaydi = action.payload.data.errors.ngaydi?.message;
          }
          else
            state.err = {
              status: 500,
              data: "Lỗi server"
            }
        }
        else {
          state.form.isSubmitted = true;
        }
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

export const selectCVDiForm = state => state.cvdi.form;
export const selectCVDiData = state => state.cvdi.data;
export const selectCVDiErr = state => state.cvdi.err;

export const { reset, onChangeFormSo, onChangeFormDVNhan, setCBNhap, onChangeFormLCV, onChangeFormDK, onChangeFormDM, onChangeFormNgay, onChangeFormHieuLuc, onChangeFormTrichYeu, onChangeFormNGuoiKy, onChangeFormChucVuNguoiKy, onChangeFormSoTo, onChangeFormNoiLuu, onChangeFormGhiChu, onChangeFormNgayDi, onChangeFormHanTraLoi, onChangeFormTapTin, onChangeFormTrangThai, onChangeFormCBDuyet, onChangeFormCBTrangThai, resetFormErr, resetForm, resetTapTin, formatDate, onChangeFormEmailND, onChangeFormEmailTitle, onChangeFormEmailSend } = congVanDiSlice.actions;

export default congVanDiSlice.reducer;
