import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPublic, HttpService } from '../../Service/HttpService';
import { getToken } from '../../Utils/Auth';
import { setUserData } from '../slices/authSlice';

export const tokenFromLocal = createAsyncThunk(
  'auth/tokenFromLocal',
  async ({ rejectWithValue }) => {
    try {
      return getToken();

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

export const getUserInfo = () => async (dispatch) => {

  try {
    const httpService = new HttpService();
    const response = await httpService.apiPrivate().get('/auth/me');
    
    const { id, firstName, lastName, email, avatar, roleId, points } = response.data.body;

    const userData = {
      id,
      firstName,
      lastName,
      email,
      avatar,
      roleId,
      points
    };

    dispatch(setUserData(userData));
  } catch (error) {
    return error.message;
  }
};