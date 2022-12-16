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
    setBansAdminUsers: (state, action) => { 
      const copy = state.adminUsers.map(copy => {

        if(copy.id === action.payload.id){
          copy = action.payload;
        }

        return copy;
      });

      state.adminUsers = copy;
    },
  }
});

export const { 
  setUser,
  resetUser,
  setAdminUsers,
  resetAdminUsers,
  setBansAdminUsers

} = userSlice.actions;

export default userSlice.reducer;
