import styled from 'styled-components';
import Button from '../common/Button';
import { FaHeart } from 'react-icons/fa';
import { BookDetail } from '../../models/book.model';

interface Props {
   book: BookDetail;
   onClick: () => void;
}

const LikeButton = ({ book, onClick }: Props) => {
   return (
      <LikeButtonStyle>
         <Button
            size='medium'
            schema={book.favorited ? 'favorite' : 'normal'}
            disabled={false}
            isLoading={false}
            onClick={onClick}
         >
            <FaHeart />
            {book.favorites}
         </Button>
      </LikeButtonStyle>
   );
};

const LikeButtonStyle = styled.div`
   Button {
      display: flex;
      gap: 6px;
      svg {
         color: inherit;
         * {
            color: inherit;
         }
      }
   }
`;

export default LikeButton;
