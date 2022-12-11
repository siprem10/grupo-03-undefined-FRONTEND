import { useSelector } from "react-redux";

export function isLogged() {
    const { token } = useSelector((state) => state.auth);
    const { userData } = useSelector((state) => state.auth);

    if (!token || !Object.keys(userData).length) return undefined;

    return token;
}

export function isLoggedAdmin() {
    const { token } = useSelector((state) => state.auth);
    const { userData } = useSelector((state) => state.auth);

    if (!token || !Object.keys(userData).length) return undefined;

    return userData.roleId === 1;
}