import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from './congVanDenAPI'

const initialState = {
  data: [],
  form: {
    _id: '',
    so: '',
    dv_phathanh: '',
    loaicongvan: '',
    cb_nhap: '',
    cb_pheduyet: '',
    cb_xuly: '',
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
    hangiaiquyet: '',
    ykien: '',
    ngayden: '',
    taptin: [],
    errso: null,
    errdv_phathanh: null,
    errloaicongvan: null,
    errcb_nhap: null,
    errcb_pheduyet: null,
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
    errhangiaiquyet: null,
    errykien: null,
    errngayden: null,
    errtaptin: null,
    isSubmitted: false,
  },
  err: null
}

export const getDataAsync = createAsyncThunk(
  'congvanden/getdata',
  async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getDuLieuChuaDuyetAsync = createAsyncThunk(
  'congvanden/getdulieuchuaduyet',
  async () => {
    try {
      const response = await api.getdulieuchuaduyet();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getDuLieuTuChoiAsync = createAsyncThunk(
  'congvanden/getdulieutuchoi',
  async () => {
    try {
      const response = await api.getdulieutuchoi();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getDuLieuXuLyAsync = createAsyncThunk(
  'congvanden/getdulieuxuly',
  async () => {
    try {
      const response = await api.getdulieuxuly();
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const getDetailDataAsync = createAsyncThunk(
  'congvanden/getdetaildata',
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
  'congvanden/createdata',
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
  'congvanden/editdata',
  async (form) => {
    try {
      const response = await api.put(form._id, form);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const duyetCVAsync = createAsyncThunk(
  'congvanden/duyetCV',
  async (form) => {
    try {
      const response = await api.duyetCV(form._id, form);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const khongDuyetCVAsync = createAsyncThunk(
  'congvanden/khongduyetCV',
  async (form) => {
    try {
      const response = await api.khongduyetCV(form._id, form);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const xuLyCVAsync = createAsyncThunk(
  'congvanden/xulyCV',
  async (id) => {
    try {
      const response = await api.xulyCV(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const deleteDataAsync = createAsyncThunk(
  'congvanden/deletedata',
  async (id) => {
    try {
      const response = await api.delete(id);
      return response.data;
    } catch (error) {
      return error.response;
    }
  }
)

export const congVanDenSlice = createSlice({
  name: 'congvanden',
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
    onChangeFormNgayDen: (state, action) => {
      state.form.ngayden = action.payload;
    },
    onChangeFormHanGiaiQuyet: (state, action) => {
      state.form.hangiaiquyet = action.payload;
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
    onChangeFormCBXuLy: (state, action) => {
      state.form.cb_xuly = action.payload;
    },
    onChangeFormYKien: (state, action) => {
      state.form.ykien = action.payload;
    },
    resetFormErr: (state) => {
      state.form.errchucvu_nguoiky = null;
      state.form.errdokhan = null;
      state.form.errdomat = null;
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
      state.form.dv_phathanh = '';
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
      state.form.hangiaiquyet = '';
      state.form.ykien = '';
      state.form.ngayden = '';
      state.form.taptin = [];
      state.form.isSubmitted = false;
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
      state.form.ngayden = formatdate(state.form.ngayden);
      state.form.hieuluc = formatdate(state.form.hieuluc);
      state.form.hangiaiquyet = formatdate(state.form.hangiaiquyet);
    },
    resetTapTin: (state) => {
      state.form.taptin = [];
    },
    setIsSubmited: (state, action) => {
      state.form.isSubmitted = action.payload;
    }
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
      .addCase(getDuLieuChuaDuyetAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else
          state.data = action.payload;
      })
      .addCase(getDuLieuTuChoiAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else
          state.data = action.payload;
      })
      .addCase(getDuLieuXuLyAsync.fulfilled, (state, action) => {
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
      .addCase(duyetCVAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else {
          state.form.isSubmitted = true;
        }
      })
      .addCase(khongDuyetCVAsync.fulfilled, (state, action) => {
        if (action.payload.status) {
          if (action.payload.status === 404)
            state.err = { status: 404, data: "Lỗi không tìm thấy server" }
          else
            state.err = { status: 500, data: "Lỗi server" }
        }
        else {
          state.form.isSubmitted = true;
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
            state.form.errdv_phathanh = action.payload.data.errors.dv_phathanh ? "Bạn phải chọn đơn vị phát hành" : null;
            state.form.errloaicongvan = action.payload.data.errors.loaicongvan ? "Bạn phải chọn loại công văn" : null;
            state.form.errngay = action.payload.data.errors.ngay?.message;
            state.form.errnguoiky = action.payload.data.errors.nguoiky?.message;
            state.form.errnoiluu = action.payload.data.errors.noiluu?.message;
            state.form.errso = action.payload.data.errors.so?.message;
            state.form.errsoto = action.payload.data.errors.soto?.message;
            state.form.errtaptin = action.payload.data.errors.taptin?.message;
            state.form.errtrangthai = action.payload.data.errors.trangthai ? "Bạn phải chọn trạng thái" : null;
            state.form.errtrichyeu = action.payload.data.errors.trichyeu?.message;
            state.form.errngayden = action.payload.data.errors.ngayden?.message;
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
            state.form.errdv_phathanh = action.payload.data.errors.dv_phathanh ? "Bạn phải chọn đơn vị phát hành" : null;
            state.form.errloaicongvan = action.payload.data.errors.loaicongvan ? "Bạn phải chọn loại công văn" : null;
            state.form.errngay = action.payload.data.errors.ngay?.message;
            state.form.errnguoiky = action.payload.data.errors.nguoiky?.message;
            state.form.errnoiluu = action.payload.data.errors.noiluu?.message;
            state.form.errso = action.payload.data.errors.so?.message;
            state.form.errsoto = action.payload.data.errors.soto?.message;
            state.form.errtaptin = action.payload.data.errors.taptin?.message;
            state.form.errtrangthai = action.payload.data.errors.trangthai ? "Bạn phải chọn trạng thái" : null;
            state.form.errtrichyeu = action.payload.data.errors.trichyeu?.message;
            state.form.errngayden = action.payload.data.errors.ngayden?.message;
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

export const selectCVDForm = state => state.cvd.form;
export const selectCVDData = state => state.cvd.data;
export const selectCVDErr = state => state.cvd.err;

export const { reset, onChangeFormSo, onChangeFormDVPhatHanh, onChangeFormDVNhan, setCBNhap, onChangeFormLCV, onChangeFormDK, onChangeFormDM, onChangeFormNgay, onChangeFormHieuLuc, onChangeFormTrichYeu, onChangeFormNGuoiKy, onChangeFormChucVuNguoiKy, onChangeFormSoTo, onChangeFormNoiLuu, onChangeFormGhiChu, onChangeFormNgayDen, onChangeFormHanGiaiQuyet, onChangeFormTapTin, onChangeFormTrangThai, onChangeFormCBDuyet, onChangeFormCBTrangThai, resetFormErr, resetForm, resetTapTin, formatDate, onChangeFormCBXuLy, onChangeFormYKien, setIsSubmited, } = congVanDenSlice.actions;

export default congVanDenSlice.reducer;
