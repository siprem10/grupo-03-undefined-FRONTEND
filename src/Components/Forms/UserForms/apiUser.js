import axios from 'axios';
import { getToken } from '../../../Utils/Auth';

export const apiUsers = axios.create({
    baseURL: 'http://localhost:3000/users',
    headers: {
        'content-type': 'multipart/form-data',
        'auth-token': getToken(),
    },
});
