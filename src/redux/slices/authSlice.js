import { createSlice } from '@reduxjs/toolkit';
import { login, tokenFromLocal } from '../actions/authActions';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'failed' | 'success'
  token: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Session actions
    builder
      .addCase(tokenFromLocal.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tokenFromLocal.fulfilled, (state, action) => {
        state.token = action.payload;
        state.error = null;
        state.status = 'success';
      })
      .addCase(tokenFromLocal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Login actions
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('login.fulfilled', action.payload);
        state.status = 'success';
        state.token = action.payload;
        state.error = null;

        // Save token to local storage
        localStorage.setItem('userToken', JSON.stringify(action.payload));


      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;
