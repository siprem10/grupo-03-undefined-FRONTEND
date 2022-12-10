import { createSlice } from '@reduxjs/toolkit';
import { getToken, getUserData } from '../../Utils/Auth';
import { login, tokenFromLocal } from '../actions/authActions';

const initialState = {
  status: getToken() ? 'success' : 'idle', // 'idle' | 'loading' | 'failed' | 'success'
  token: getToken(),
  userData: getUserData() || {},
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    setLogout: (state) => {
      state = {
        status: "idle",
        token: null,
        error: null,
        userData: null
      }
    }
  },
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
        state.status = 'success';
        state.token = action.payload;
        state.error = null;

        // Save token to local storage
        localStorage.setItem('accessToken', JSON.stringify(action.payload));
        
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { 
  setUserData,
  setLogout

} = authSlice.actions;

export default authSlice.reducer;
