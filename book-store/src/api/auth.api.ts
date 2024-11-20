import { SignupProps } from '../pages/SignUp';
import { httpClient } from './http';

export const login = async (data: SignupProps) => {
   const response = await httpClient.post<LoginResponse>('/users/login', data);
   return response.data;
};

export const signup = async (userData: SignupProps) => {
   console.log('userData : ', userData);
   const response = await httpClient.post('/users/join', userData);
   return response.data;
};

export const resetRequest = async (data: SignupProps) => {
   const response = await httpClient.post('/users/reset');
   return response.data;
};

export const resetPassword = async (data: SignupProps) => {
   const response = await httpClient.put('/users/reset');
   return response.data;
};

interface LoginResponse {
   token: string;
}
