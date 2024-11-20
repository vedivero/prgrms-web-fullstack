import { BookReviewItemWrite } from '@/models/book.model';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
   onAdd: (data: BookReviewItemWrite) => void;
}

const BookReviewAdd = ({ onAdd }: Props) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<BookReviewItemWrite>();

   return (
      <>
         <BookReviewAddStyle>
            <form onSubmit={handleSubmit(onAdd)}>
               <fieldset>
                  <textarea {...register('content', { required: true })}> </textarea>
                  {errors.content && <p className='error-text'>리뷰 내용을 입력해 주세요</p>}
               </fieldset>
               <fieldset>
                  <select {...register('score', { required: true, valueAsNumber: true })}>
                     <option></option>
                  </select>
               </fieldset>
            </form>
            <Button size='medium' schema='primary'>
               작성하기
            </Button>
         </BookReviewAddStyle>
      </>
   );
};

const BookReviewAddStyle = styled.div`
   display: flex;
   flex-direction: column;
   gap: 6px;

   fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: end;

      .error-text {
         color: red;
         position: absolute;
         margin: 0;
      }
   }

   textarea {
      width: 100%;
      height: 100%;
      padding: 12px;
   }

   .submit {
      display: flex;
      justify-content: end;
   }
`;
export default BookReviewAdd;
