import { useEffect, useState } from 'react';
import { HttpService } from '../Service/HttpService';

export default function useUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const httpService = new HttpService();
        const response = await httpService.apiPrivate().get('/users');
        const usersList = response.data.body;
        setUsers(usersList);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return users;
}
