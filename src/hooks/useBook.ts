import { useEffect, useState } from 'react';
import { BookDetail } from '../models/book.model';
import { favoriteBook, fetchBook, unFavoriteBook } from '../api/books.api';
import { addCart } from '../api/carts.api';

export const useBook = (bookId: string | undefined) => {
   const [book, setBook] = useState<BookDetail | null>(null);
   const [cartAdded, setCartAdded] = useState(false);
   const favoriteToggle = () => {
      if (!book) return;

      if (book.favorited) {
         unFavoriteBook(bookId).then(() => {
            setBook({
               ...book,
               favorited: false,
               favorites: book.favorites - 1,
            });
         });
      } else {
         favoriteBook(bookId).then(() => {
            setBook({
               ...book,
               favorited: true,
               favorites: book.favorites + 1,
            });
         });
      }
   };

   const addToCart = (quantity: number) => {
      if (!book) return;
      addCart({
         book_id: book.id,
         quantity,
      }).then(() => {
         setCartAdded(true);
         setTimeout(() => {
            setCartAdded(false);
         }, 3000);
      });
   };

   useEffect(() => {
      if (!bookId) return;
      fetchBook(bookId).then((book) => {
         console.log('useEffect book - id : ', bookId);
         console.log('useEffect book  : ', book);
         setBook(book);
      });
   }, [bookId]);

   return { book, favoriteToggle, addToCart, cartAdded };
};
