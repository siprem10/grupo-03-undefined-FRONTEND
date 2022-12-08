import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPrivate, apiPublic } from '../../service/getData';

export const tokenFromLocal = createAsyncThunk(
  'auth/tokenFromLocal',
  async ({ rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userToken')) || null;
      console.log('tokenFromLocal', token);
      return token;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await apiPublic.post('/auth/login', { email, password });
      const token = response.data.token;
      return token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await apiPublic.post('/users', { email, password, firstName, lastName });
      const user = response.data.body;
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
