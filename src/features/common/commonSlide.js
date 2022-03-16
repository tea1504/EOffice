import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  sidebar: true,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export const selectSidebar = (state) => state.common.sidebar;

export const { toggleSidebar } = commonSlice.actions;

export default commonSlice.reducer;