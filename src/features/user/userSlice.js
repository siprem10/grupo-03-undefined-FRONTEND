import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from './userActions';

const initialState = {
  info: {},
  status: 'idle', // 'idle' | 'loading' | 'failed' | 'success'
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Logged in user actions
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.status = 'success';
        state.info = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const selectUser = state => state.user.info;

export default userSlice.reducer;
