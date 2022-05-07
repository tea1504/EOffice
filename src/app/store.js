import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import userReducer from '../features/user/userSlice';
import loaiCongVanReducer from '../features/admin/loaicongvan/loaiCongVanSlice';
import commonReducer from '../features/common/commonSlide';
import doKhanReducer from '../features/admin/dokhan/doKhanSlice';
import doMatReducer from '../features/admin/domat/doMatSlice';
import donViReducer from '../features/admin/donvi/donViSlice';
import canBoReducer from '../features/admin/canbo/canBoSlice';
import congVanDenReducer from '../features/congvanden/congVanDenSlice';
import congVanDiReducer from '../features/congvandi/congVanDiSlice';
import trangThaiReducer from '../features/admin/trangthai/trangThaiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    user: userReducer,
    common: commonReducer,
    lcv: loaiCongVanReducer,
    dk: doKhanReducer,
    dm: doMatReducer,
    dv: donViReducer,
    cb: canBoReducer,
    cvd: congVanDenReducer,
    cvdi: congVanDiReducer,
    tt: trangThaiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
