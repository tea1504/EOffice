import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from './congVanDenAPI'

const initialState = {
  data: [],
  form: {
    so: '',
    dv_phathanh: '',
    dv_nhan: [],
    loaicongvan: '',
    cb_nhap: '',
    cb_pheduyet: '',
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
    errdv_nhan: null,
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
  },
  err: null
}

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

export const congVanDenSlice = createSlice({
  name: 'congvanden',
  initialState,
  reducers: {
    onChangeFormSo: (state, action) => {
      state.form.so = action.payload;
    },
    onChangeFormDVPhatHanh: (state, action) => {
      state.form.dv_phathanh = action.payload;
    },
    onChangeFormDVNhan: (state, action) => {
      state.form.dv_nhan = action.payload.map(el => el._id);
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
      console.log(action.payload);
      state.form.taptin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDataAsync.fulfilled, (state, action) => {
        console.log(action);
      })
  }
})

export const selectCVDForm = state => state.cvd.form;

export const { onChangeFormSo, onChangeFormDVPhatHanh, onChangeFormDVNhan, setCBNhap, onChangeFormLCV, onChangeFormDK, onChangeFormDM, onChangeFormNgay, onChangeFormHieuLuc, onChangeFormTrichYeu, onChangeFormNGuoiKy, onChangeFormChucVuNguoiKy, onChangeFormSoTo, onChangeFormNoiLuu, onChangeFormGhiChu, onChangeFormNgayDen, onChangeFormHanGiaiQuyet, onChangeFormTapTin, onChangeFormTrangThai, } = congVanDenSlice.actions;

export default congVanDenSlice.reducer;
