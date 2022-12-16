import { useEffect, useState } from 'react';
import { HttpService } from '../Service/HttpService';

export default function useUsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const httpService = new HttpService();
        const response = await httpService.apiPrivate().get('/users?excludeYou=true');
        let usersList = response.data.body;

        usersList = usersList.map(user => {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            deletedAt: user.deletedAt
          };
        });
        setUsers(usersList);
        
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  return users;
}
