import { message } from 'antd';
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
    const msg = error.response?.data?.message || '请求失败,请稍后重试！';
    message.error(msg);
    return Promise.reject(error);
  }
);

export default http;
