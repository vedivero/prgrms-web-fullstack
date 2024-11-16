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

   useEffect(() => {
      if (!bookId) return;
      fetchBook(bookId).then((book) => {
         setBook(book);
      });
   }, [bookId]);

   return { book, favoriteToggle, addToCart, cartAdded };
};
