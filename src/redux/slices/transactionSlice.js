import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: null,
  balance: null
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },  
});

export const { 
  setTransactions,

} = transactionSlice.actions;

export default transactionSlice.reducer;