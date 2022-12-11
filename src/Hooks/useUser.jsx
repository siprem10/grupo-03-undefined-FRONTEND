import { useEffect, useState } from 'react';
import { usersApi } from '../api/usersApi';

function useUser() {
    const [token, setToken] = useState('');

    const getToken = () => {
        // funcion para obtener el token del localStorage
    };

    const handleLogin = () => {
        // funcion para loguearse
    };

    const handleLogout = () => {
        // funcion para desloguearse
    };

    useEffect(() => {
        const userToken = window.localStorage.getItem('token');

        if (userToken) {
            token = userToken;
        }
    }, []);

    return {
        token,
        getToken,
        handleLogin,
        handleLogout,
    };
}

export default useUser;
