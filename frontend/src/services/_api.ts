import axios from 'axios';

const isServer = typeof window === 'undefined';
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL
});

api.interceptors.request.use(async (config) => {
  if (isServer) {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();

    config.headers.Cookie = cookieStore;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error?.response?.data?.message ?? error?.message);
  }
);

export default api;
