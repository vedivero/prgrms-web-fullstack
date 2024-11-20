import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../components/common/Title';
import { CartStyle } from './Cart';
import CartSummary from '../components/Cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import { useForm } from 'react-hook-form';
import { Delivery, OrderSheet } from '../models/order.model';
import FindAddressButton from '../components/order/FindAddressButton';
import { order } from '../api/order.api';
import { useAlert } from '../hooks/useAlert';

interface DeliveryFrom extends Delivery {
   addressDetail: string;
}

const Order = () => {
   const { showAlert, showConfirm } = useAlert();
   const location = useLocation();
   const orderDataFromCart = location.state;
   const { totalPrice, totalQuantity, firstBookTitle } = orderDataFromCart;
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
   } = useForm<DeliveryFrom>();

   const handlePay = (data: DeliveryFrom) => {
      const orderData: OrderSheet = {
         ...orderDataFromCart,
         delivery: {
            ...data,
            address: `${data.address} ${data.addressDetail}`,
         },
      };
      order(orderData).then(() => {
         showConfirm('결제를 진행하시겠습니까?', () => {
            showAlert('주문이 완료되었습니다.');
            navigate('/orderList');
         });
      });
   };

   return (
      <OrderStyle>
         <>
            <Title size='large'>주문서 작성</Title>
            <CartStyle>
               <div className='content'>
                  <div className='order-info'>
                     <Title size='medium'>배송 정보</Title>
                     <form className='delivery'>
                        <fieldset>
                           <label>수령인</label>
                           <div className='input'>
                              <InputText inputType='text' {...register('receiver', { required: true })} />
                           </div>
                        </fieldset>
                        {errors.address && <p className='error-text'>받으실 성함을 입력해주세요.</p>}
                        <fieldset>
                           <label>전화번호</label>
                           <div className='input'>
                              <InputText inputType='text' {...register('contact', { required: true })} />
                           </div>
                        </fieldset>
                        {errors.contact && <p className='error-text'>받으실 분의 전화번호를 입력해주세요.</p>}
                        <fieldset>
                           <label>주소</label>
                           <div className='input'>
                              <InputText inputType='text' {...register('address', { required: true })} />
                           </div>
                           <FindAddressButton
                              onCompleted={(address) => {
                                 setValue('address', address);
                              }}
                           />
                        </fieldset>
                        {errors.address && <p className='error-text'>상품을 받으실 주소를 입력해주세요.</p>}
                        <fieldset>
                           <label>상세주소</label>
                           <div className='input'>
                              <InputText
                                 inputType='text'
                                 {...register('addressDetail', { required: true })}
                              />
                           </div>
                        </fieldset>
                        {errors.addressDetail && (
                           <p className='error-text'>상품을 받으실 상세 주소를 입력해주세요.</p>
                        )}
                     </form>
                  </div>
                  <div className='order-info'>
                     <Title size='medium'>주문 상품</Title>
                     <strong>
                        {firstBookTitle} 외, 총 {totalQuantity}권
                     </strong>
                  </div>
               </div>
               <div className='summary'>
                  <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
                  <Button size='large' schema='primary' onClick={handleSubmit(handlePay)}>
                     결제하기
                  </Button>
               </div>
            </CartStyle>
         </>
      </OrderStyle>
   );
};

const OrderStyle = styled.div``;
export default Order;
