import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import authReducer from '../redux/slices/authSlice';
import transactionReducer from '../redux/slices/transactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    transactions: transactionReducer
  }
});
