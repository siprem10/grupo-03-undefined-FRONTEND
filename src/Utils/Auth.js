export const getToken = () => {
    return JSON.parse(localStorage.getItem('accessToken'));
};

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData'));
};
