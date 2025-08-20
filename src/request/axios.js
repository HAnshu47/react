import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const http = axios.create({
  baseURL,
  timeout: 10000
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('请求出错:', error);
    return Promise.reject(error);
  }
);

export default http;
