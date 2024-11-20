import { Cart } from '../models/cart.model';
import { httpClient } from './http';

interface AddCartParams {
   book_id: number;
   quantity: number;
}

export const addCart = async (params: AddCartParams) => {
   const token = localStorage.getItem('token');
   if (!token) {
      throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
   }
   const response = await httpClient.post('/carts', params, {
      headers: {
         Authorization: `${token}`,
      },
   });
   return response.data;
};

export const fetchCart = async () => {
   const token = localStorage.getItem('token');
   if (!token) {
      throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
   }
   const response = await httpClient.get<Cart[]>(`/carts`, {
      headers: {
         Authorization: `${token}`,
      },
   });
   return response.data;
};

export const deleteCart = async (cartId: number) => {
   const token = localStorage.getItem('token');
   if (!token) {
      throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
   }
   const response = await httpClient.delete(`/carts/${cartId}`, {
      headers: {
         Authorization: `${token}`,
      },
   });
   return response.data;
};
