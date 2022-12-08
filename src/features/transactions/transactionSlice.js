import { createSlice } from '@reduxjs/toolkit';
import { getTransactions } from './transactionActions';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'failed' | 'success
  list: [],
  error: null
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Transactions actions
    builder.addCase(getTransactions.pending, state => {
      state.status = 'loading';
      state.error = null;
      state.success = false;
    });
    builder.addCase(getTransactions.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.list = payload;
      state.error = null;
    });
    builder.addCase(getTransactions.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
    });
  }
});

export const selectTransactions = state => state.transactions.list;

export default transactionSlice.reducer;
