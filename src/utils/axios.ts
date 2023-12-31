'use client'
import axios, { AxiosInstance } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Axios Interceptor để tự động thêm token vào headers nếu có
instance.interceptors.request.use(
  (config) => {
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? storedToken : null;
    console.log(token);
    if (token) {
      console.log('Adding token to headers:', token);
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default instance;
