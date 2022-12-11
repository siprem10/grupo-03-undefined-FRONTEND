import axios from 'axios';
import { getToken } from '../Utils/Auth';

const BASE_URL = 'http://localhost:3000';

export class HttpService {

  constructor(){
  }
  
  apiPrivate() {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${getToken()}`,
        withCredentials: true
      }
    });
  }
}

// get data from api without token
export const apiPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
