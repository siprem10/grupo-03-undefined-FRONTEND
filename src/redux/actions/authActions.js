import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiPublic, HttpService } from '../../Service/HttpService';
import { getToken } from '../../Utils/Auth';
import { setUserData, setLogout } from '../slices/authSlice';
import { apiUsers } from '../../Components/Forms/UserForms/apiUser';

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
            const response = await apiPublic.post('/auth/login', {
                email,
                password,
            });
            const token = response.data.token;

            return token;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
);

export const getUserInfo = () => async dispatch => {
    try {
        const httpService = new HttpService();
        const response = await httpService.apiPrivate().get('/auth/me');

        const userData = {...response.data.body};

        localStorage.setItem('userData', JSON.stringify(userData));
        dispatch(setUserData(userData));
    } catch (error) {
        return error.message;
    }
};

export function updateUserInfo(id, userUpdated) {
    return async dispatch => {
        try {
            const response = await apiUsers.put(`/${id}`, userUpdated);

            const { password, createdAt, updatedAt, deletedAt, ...userData } =
                response.data.body;

            localStorage.setItem('userData', JSON.stringify(userData));
            dispatch(setUserData(userData));
        } catch (error) {
            return error.message;
        }
    };
}

export const logout = () => async dispatch => {
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userData');
        dispatch(setLogout());
    } catch (error) {
        return error.message;
    }
};
