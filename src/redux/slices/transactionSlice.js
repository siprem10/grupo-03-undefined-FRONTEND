import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  transactions: [],
  transactionsFilter: [],
  categories: [],
  filter: "",
  balance: null
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
      state.transactionsFilter = action.payload.transactionsFilter;
      state.balance = action.payload.balance;
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
  },  
});

export const { 
  setTransactions,
  setFilter,
  setCategories

} = transactionSlice.actions;

export default transactionSlice.reducer;