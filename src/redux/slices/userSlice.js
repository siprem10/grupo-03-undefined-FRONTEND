import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  findUser: {},
  adminUsers: []
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
    },
    setAdminUsers: (state, action) => { 
      state.adminUsers = action.payload;
    },
    resetAdminUsers: (state) => { 
      state.adminUsers = [];
    },
    setBanAdminUsers: (state, action) => { 
      console.log(action.payload)
      state.adminUsers = [...state.adminUsers.filter(user => user.id !== action.payload)];
    },
    setUnbanAdminUsers: (state, action) => { 
      state.adminUsers = [...state.adminUsers, action.payload];
    }
  }
});

export const { 
  setUser,
  resetUser,
  setAdminUsers,
  resetAdminUsers,
  setBanAdminUsers,
  setUnbanAdminUsers

} = userSlice.actions;

export default userSlice.reducer;
