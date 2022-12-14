import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  findUser: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => { 
      state.findUser = action.payload;
    },
    resetUser: (state) => { 
      state.findUser = {};
    }
  }
});

export const { 
  setUser,
  resetUser

} = userSlice.actions;

export default userSlice.reducer;
