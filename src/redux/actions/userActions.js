import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPrivate } from '../../service/httpRequest';

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async () => {
  try {
    const response = await apiPrivate.get('/auth/me');
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
