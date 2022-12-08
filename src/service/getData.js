import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

// get token from local storage
const token = () => {
  const token = JSON.parse(localStorage.getItem('userToken')) || null;
  return token;
};

// get data from api with token
export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'auth-token': `${token()}`,
    withCredentials: true
  }
});

// get data from api without token
export const apiPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
