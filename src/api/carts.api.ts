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
