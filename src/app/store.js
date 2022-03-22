import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import userReducer from '../features/user/userSlice';
import loaiCongVanReducer from '../features/admin/loaicongvan/loaiCongVanSlice';
import commonReducer from '../features/common/commonSlide';
import doKhanReducer from '../features/admin/dokhan/doKhanSlice';
import doMatReducer from '../features/admin/domat/doMatSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    user: userReducer,
    common: commonReducer,
    lcv: loaiCongVanReducer,
    dk: doKhanReducer,
    dm: doMatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
