import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';

//모든 요청에 base로 들어가는 URL
const BASE_URL = 'http://localhost:5000';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
   console.log('createClient');
   const axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: DEFAULT_TIMEOUT,
      headers: {
         'content-type': 'application/json',
      },
      withCredentials: true,
      ...config,
   });

   //Error handle
   axiosInstance.interceptors.response.use(
      (response) => {
         return response;
      },
      (error) => {
         console.log('error : ', error);
         if (error.response.status === 401) {
            removeToken();
            window.location.href = '/login';
            return;
         }
         return Promise.reject(error);
      },
   );

   return axiosInstance;
};

export const httpClient = createClient();
