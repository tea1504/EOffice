import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from './doKhanAPI'

const initialState = {
  data: [],
  form: {
    _id: '',
    ten: '',
    errTen: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.data = action.payload;
      })
  }
})

export const selectDKData = state => state.dk.data;
export const selectDKEdit = state => state.dk.edit;
export const selectDKAdd = state => state.dk.add;

export const { setAdd, setEdit, } = doKhanSlice.actions;

export default doKhanSlice.reducer;
