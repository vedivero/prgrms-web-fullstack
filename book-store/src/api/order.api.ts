import { Order, OrderDetailItem, OrderSheet } from '../models/order.model';
import { httpClient, requestHandler } from './http';

// export const order = async (orderData: OrderSheet) => {
//    const token = localStorage.getItem('token');
//    if (!token) {
//       throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
//    }
//    const response = await httpClient.post('/orders', orderData, {
//       headers: {
//          Authorization: `${token}`,
//       },
//    });
//    return response.data;
// };

export const order = async (orderData: OrderSheet) => {
   return await requestHandler<OrderSheet>('post', '/orders', orderData);
};

// export const fetchOrders = async () => {
//    const token = localStorage.getItem('token');
//    if (!token) {
//       throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
//    }
//    const response = await httpClient.get<Order[]>('/orders', {
//       headers: {
//          Authorization: `${token}`,
//       },
//    });
//    return response.data;
// };
export const fetchOrders = async () => {
   return await requestHandler('get', '/orders');
};

// export const fetchOrder = async (orderId: number) => {
//    const token = localStorage.getItem('token');
//    if (!token) {
//       throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
//    }
//    const response = await httpClient.get<OrderDetailItem[]>(`/orders/${orderId}`, {
//       headers: {
//          Authorization: `${token}`,
//       },
//    });
//    return response.data;
// };
export const fetchOrder = async (orderId: number) => {
   return await requestHandler('get', `/orders/${orderId}`);
};
