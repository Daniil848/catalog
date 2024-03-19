import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface State {
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  loading: false,
  error: false,
};

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  // },
});

// export const {} = mainSlice.actions;

export default mainSlice.reducer;
