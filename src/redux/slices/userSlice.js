import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'failed' | 'success'
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},  
});


export default userSlice.reducer;
