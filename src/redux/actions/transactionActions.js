import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from '../../Service/HttpService';
import { setTransactions, setFilter, setCategories } from '../slices/transactionSlice';
import { formatDate } from '../../Utils/Date';

export const getTransactions = (id, filter) => async (dispatch) => {
  try {
    const httpService = new HttpService();
    let transactions = await httpService.apiPrivate().get(`/transactions`);
    let balance = 0;

    if (transactions) {
      transactions = transactions.data.body.map(data => {

        data.user.fullname = data.user.firstName + " " + data.user.lastName;

        if (data.toUser) {
          data.toUser.fullname = data.toUser.firstName + " " + data.toUser.lastName;
        }

        if (!data.toUserId) {
          data.pay = "Pago del servicio"
          data.type = "Egreso";
        }

        else if (data.userId === data.toUserId) {
          data.pay = "Carga de saldo"
          data.type = "Ingreso";
        }

        else if (id !== data.userId) {
          data.pay = "Transferencia recibida"
          data.type = "Ingreso";
        }

        else if (id !== data.toUserId) {
          data.pay = "Transferencia enviada"
          data.type = "Egreso";
        }

        if (data.type === "Egreso") {
          balance -= data.amount;
        } else {
          balance += data.amount;
        }

        return { ...data, createdAt: formatDate(data.createdAt), updatedAt: formatDate(data.updatedAt) }
      })
    }

    const transactionsFilter = transactions.filter(t => t.type.includes(filter));

    dispatch(setTransactions({ transactions, balance, transactionsFilter }));

  } catch (error) {
    dispatch(setTransactions({ transactions: [], balance: 0, transactionsFilter: [] }));
    return error.message;
  }
};

export const setFiltered = (filter = "") => async (dispatch) => {
  try {
    dispatch(setFilter(filter));

  } catch (error) {
    return error.message;
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const httpService = new HttpService();
    const response = await httpService.apiPrivate().get(`/categories`);
    
    const categories = response.data.body.map(c => {
      return { id: c.id, name: c.name }
    });

    dispatch(setCategories(categories));

  } catch (error) {
    dispatch(setTransactions({ transactions: [], balance: 0, transactionsFilter: [] }));
    return error.message;
  }
};

export const createTransaction = createAsyncThunk(
  'user/createTransaction',
  async ({ amount, concept, userId, categoryId }) => {
    try {
      const httpService = new HttpService();
      const response = await httpService.apiPrivate().post('/transactions', {
        concept,
        amount,
        userId,
        toUserId,
        categoryId,
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
