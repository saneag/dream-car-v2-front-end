import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dream-car-backend.onrender.com',
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');
    if (!config.headers.Authorization)
        config.headers.Authorization = window.sessionStorage.getItem('token');
    return config;
});

export default instance;
