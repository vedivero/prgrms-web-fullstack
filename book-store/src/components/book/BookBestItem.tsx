import styled from 'styled-components';
import BookItem, { BookItemStyle } from '../books/BookItem';
import { Book } from '@/models/book.model';

interface Props {
   book: Book;
   itemIndex: number;
}

const BookBestItem = ({ book, itemIndex }: Props) => {
   return (
      <>
         <BookBestItemStyle>
            <BookItem book={book} view='grid' />
            <div className='rank'>{itemIndex + 1}</div>
         </BookBestItemStyle>
      </>
   );
};

export const BookBestItemStyle = styled.div`
   ${BookItemStyle} {
      .summary,
      .price,
      .likes {
         display: none;
      }
   }
   h2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
   }
   position: relative;

   .rank {
      position: absolute;
      top: -10px;
      left: -10px;
      width: 40px;
      height: 40px;
      background: ${(props) => props.theme.color.primary};
      border-redius: 500px;
      display: flex;
      align-items: center;
      font-size: 1.25rem;
      color: #fff;
      font-weight: italic;
   }
`;
export default BookBestItem;
