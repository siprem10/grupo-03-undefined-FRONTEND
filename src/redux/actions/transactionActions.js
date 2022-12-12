import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from '../../Service/HttpService';
import { setTransactions } from '../slices/transactionSlice';

export const getTransactions = (name = "") => async (dispatch) => {
  try {
    const httpService = new HttpService();
    const response = await httpService.apiPrivate().get(`/transactions?name=${name}`);
    dispatch(setTransactions(response));
    
  } catch (error) {
    return error.message;
  }
};

export const createTransaction = createAsyncThunk(
  'user/createTransaction',
  async ({ amount, description, userId, categoryId, date }) => {
    try {      
      const httpService = new HttpService();
      const response = await httpService.apiPrivate().post('/transactions', {
        amount,
        description,
        userId,
        categoryId,
        date
      });
      const transactions = response.data.transactions;
      
      return transactions;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const updateTransaction = createAsyncThunk(
  'user/updateTransaction',
  async ({ id, amount, description, date }) => {
    try {
      const httpService = new HttpService();
      const response = await httpService.apiPrivate().put(`/transactions/${id}`, { amount, description, date });
      const transactions = response.data.body;
      return transactions;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const deleteTransaction = createAsyncThunk('user/deleteTransaction', async id => {
  try {
    const httpService = new HttpService();
    const response = await httpService.apiPrivate().delete(`/transactions/${id}`);
    const transactions = response.data.body;
    return transactions;
  } catch (error) {
    return error.response.data;
  }
});
