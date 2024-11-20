import styled from 'styled-components';
import { formatNumber } from '../../utils/format';

interface Props {
   totalQuantity: number;
   totalPrice: number;
}

const CartSummary = ({ totalQuantity, totalPrice }: Props) => {
   return (
      <CartSummaryStyled>
         <h1>주문 요약</h1>
         <dl>
            <dt>총 수량</dt>
            <dd>{totalQuantity}</dd>
         </dl>
         <dl>
            <dt>총 금액</dt>
            <dd>{formatNumber(totalPrice)}원</dd>
         </dl>
      </CartSummaryStyled>
   );
};

const CartSummaryStyled = styled.div`
   border: 1px solid ${({ theme }) => theme.color.border};
   border-radius: 1px solid ${({ theme }) => theme.borderRadius};
   padding: 12px;
   width: 240px;

   h1 {
      font-size: 1.5rem;
      margin-bottom: 12px;
   }
   dl {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      dd {
         font-weight: 700;
      }
   }
`;

export default CartSummary;
