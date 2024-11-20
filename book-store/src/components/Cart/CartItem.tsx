import styled from 'styled-components';
import { Cart } from '../../models/cart.model';
import Button from '../common/Button';
import Title from '../common/Title';
import { formatNumber } from '../../utils/format';
import CheckIconButton from './CheckIconButton';
import { useMemo } from 'react';
import { useAlert } from '../../hooks/useAlert';

interface Props {
   cart: Cart;
   checkedItems: number[];
   onCheck: (id: number) => void;
   onDelete: (id: number) => void;
}

const CartItem = ({ cart, checkedItems, onCheck, onDelete }: Props) => {
   const { showConfirm } = useAlert();
   const isChecked = useMemo(() => {
      return checkedItems.includes(cart.book_id);
   }, [checkedItems, cart.book_id]);

   const handleCheck = () => {
      onCheck(cart.book_id);
   };

   const handleDelete = (id: number) => {
      showConfirm('삭제하시겠습니까?', () => {
         onDelete(cart.id);
      });
   };

   return (
      <CartItemStyle>
         <div className='info'>
            <div className='check'>
               <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
            </div>
            <div>
               <Title size='medium' color='text'>
                  {cart.title}
               </Title>
               <p className='summary'>{cart.summary}</p>
               <p className='price'>{formatNumber(cart.price)}</p>
               <p className='quantity'>{cart.quantity}</p>
            </div>
         </div>
         <Button
            size='medium'
            schema={'normal'}
            disabled={false}
            isLoading={false}
            onClick={() => handleDelete(cart.id)}
         >
            장바구니 삭제
         </Button>
      </CartItemStyle>
   );
};

const CartItemStyle = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: start;
   border: 1px solid ${({ theme }) => theme.color.border};
   border-radius: 1px solid ${({ theme }) => theme.borderRadius};
   padding: 12px;

   .info {
      display: flex;
      align-items: start;
      flex: 1;

      .check {
         width: 40px;
         flex-shrink: 0;
      }

      p {
         padding: 0 0 8px 0;
         margin: 0;
      }
   }
`;
export default CartItem;
