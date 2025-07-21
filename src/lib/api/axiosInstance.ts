import axios from 'axios';
import { PUBLIC_API_BASE_URL } from "$env/static/public";
import {refreshTokenRequest} from "$lib/api/userApi";

const axiosInstance = axios.create({
  baseURL: PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.skipAuth) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue : {
  resolve: (value?: any ) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (err: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuth
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (token) {
                originalRequest.headers.Authorization = `Bearer ${token};`
              }
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await refreshTokenRequest();
        const newToken = refreshRes!.accessToken;
        localStorage.setItem('accessToken', newToken);
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        localStorage.removeItem('accessToken');
        window.location.reload();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);

  }
);

export default axiosInstance;