

import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, setToken, removeToken } from './auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''; // 在 .env 中配置 VITE_API_BASE_URL
const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// 请求拦截：自动带上 token
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // Axios v1+ guarantees config.headers is always defined as AxiosHeaders
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截：统一处理 401 等
instance.interceptors.response.use(
  (resp: AxiosResponse) => resp,
  (error) => {
    const resp = error?.response;
    if (resp && resp.status === 401) {
      // token 失效：清除并可触发全局登出逻辑
      removeToken();
      // 可在此处发出全局事件或跳转到登录页
      console.warn('Unauthorized - token removed');
    }
    return Promise.reject(error);
  }
);

// 登录函数：调用后会自动保存 token（依据后端返回字段名调整）
export async function login(username: string, password: string) {
  const res = await instance.post('/api/login', { username, password });
  // 后端返回 token 位置示例： res.data.token 或 res.data.access_token
  const token = res.data?.token ?? res.data?.access_token ?? null;
  if (token) setToken(token);
  return res.data;
}

// 简单导出常用方法，返回 data 部分
export const http = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig) => (await instance.get<T>(url, config)).data,
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => (await instance.post<T>(url, data, config)).data,
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => (await instance.put<T>(url, data, config)).data,
  delete: async <T = any>(url: string, config?: AxiosRequestConfig) => (await instance.delete<T>(url, config)).data,
};

export default instance;