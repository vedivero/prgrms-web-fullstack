import { useEffect, useState } from 'react';
import { BookDetail, BookReviewItem, BookReviewItemWrite } from '../models/book.model';
import { favoriteBook, fetchBook, unFavoriteBook } from '../api/books.api';
import { addCart } from '../api/carts.api';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { addBookReview, fetchBookReview } from '@/api/review.api';
import { useToast } from './useToast';

export const useBook = (bookId: string | undefined) => {
   const [book, setBook] = useState<BookDetail | null>(null);
   const [cartAdded, setCartAdded] = useState(false);
   const [reviews, setReviews] = useState<BookReviewItem[]>();

   const { isLoggedIn } = useAuthStore();
   const { showAlert } = useAlert();
   const { showToast } = useToast();

   const favoriteToggle = () => {
      if (!isLoggedIn) {
         showAlert('로그인이 필요합니다');
         return;
      }
      if (!book) return;

      if (book.favorited) {
         unFavoriteBook(bookId).then(() => {
            setBook({
               ...book,
               favorited: false,
               favorites: book.favorites - 1,
            });
            showToast('좋아요를 클릭했습니다.');
         });
      } else {
         favoriteBook(bookId).then(() => {
            setBook({
               ...book,
               favorited: true,
               favorites: book.favorites + 1,
            });
            showToast('좋아요가 취소되었습니다.');
         });
      }
   };

   const addToCart = (quantity: number) => {
      if (!book) return;
      console.log(book.book_id);
      addCart({
         book_id: book.book_id,
         quantity,
      }).then(() => {
         setCartAdded(true);
         setTimeout(() => {
            setCartAdded(false);
         }, 3000);
      });
   };

   const addReview = (data: BookReviewItemWrite) => {
      if (!book) return;
      addBookReview(book.id.toString(), data).then((res) => {
         fetchBook(book.id.toString()).then((book) => {
            setBook(book);
         });
         showAlert(res.message);
      });
   };

   useEffect(() => {
      if (!bookId) return;
      fetchBook(bookId).then((book) => {
         setBook(book);
      });
      fetchBookReview(bookId).then((book) => {
         setReviews(reviews);
      });
   }, [bookId]);

   return { book, favoriteToggle, addToCart, cartAdded, reviews, addReview };
};
