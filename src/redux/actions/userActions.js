import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpService } from '../../Service/HttpService';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
  try {
    const httpService = new HttpService();
    const response = await httpService.apiPrivate().get('/auth/me');
    const { id, firstName, lastName, email, avatar, roleId, points } = response.data.body;
    const user = {
      id,
      firstName,
      lastName,
      email,
      avatar,
      roleId,
      points
    };
    return user;
  } catch (error) {
    return error.message;
  }
});
