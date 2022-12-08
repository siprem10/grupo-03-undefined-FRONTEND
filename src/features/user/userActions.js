import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPrivate } from '../../service/getData';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async ({ rejectWithValue }) => {
  try {
    const response = await apiPrivate.get('/auth/me');
    console.log('fetchUserInfo', response.data.body);
    const user = {
      id: response.data.body.id,
      firstName: response.data.body.firstName,
      lastName: response.data.body.lastName,
      email: response.data.body.email,
      avatar: response.data.body.avatar,
      roleId: response.data.body.roleId,
      points: response.data.body.points
    };
    return user;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const getTransactions = createAsyncThunk(
  'user/getTransactions',
  async ({ rejectWithValue }) => {
    try {
      const response = await apiPrivate.get('/transactions');
      const transactions = response.data.body;
      return transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
  async ({ id, amount, description }, { rejectWithValue }) => {
    try {
      const response = await apiPrivate.put(`/transactions/${id}`, { amount, description });
      const transactions = response.data.body;
      return transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
