import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPrivate } from '../../service/getData';

export const getTransactions = createAsyncThunk('transactions/getTransactions', async () => {
  try {
    const response = await apiPrivate.get('/transactions');
    const transactions = response.data.transactions;
    return transactions;
  } catch (error) {
    return error.response.data;
  }
});

export const createTransaction = createAsyncThunk(
  'user/createTransaction',
  async ({ amount, description, userId, categoryId, date }, { rejectWithValue }) => {
    try {
      const response = await apiPrivate.post('/transactions', {
        amount,
        description,
        userId,
        categoryId,
        date
      });
      const transactions = response.data.transactions;
      return transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'user/updateTransaction',
  async ({ id, amount, description, date }) => {
    try {
      const response = await apiPrivate.put(`/transactions/${id}`, { amount, description, date });
      const transactions = response.data.body;
      return transactions;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteTransaction = createAsyncThunk('user/deleteTransaction', async id => {
  try {
    const response = await apiPrivate.delete(`/transactions/${id}`);
    const transactions = response.data.body;
    return transactions;
  } catch (error) {
    return error.response.data;
  }
});
