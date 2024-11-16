import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { httpClient } from './http';

interface FetchBooksParams {
   category_id?: number;
   news?: boolean;
   currentPage?: number;
   limit: number;
}

interface FetchBooksResponse {
   books: Book[];
   pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
   try {
      const response = await httpClient.get<FetchBooksResponse>('/books', {
         params,
      });
      return response.data;
   } catch (error) {
      return {
         books: [],
         pagination: {
            totalCount: 0,
            currentPage: 1,
         },
      };
   }
};

export const fetchBook = async (bookId: string) => {
   const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
   console.log('response fetchBook : ', response);
   return response.data;
};

export const favoriteBook = async (bookId: string | undefined) => {
   const token = localStorage.getItem('token');
   if (!token) {
      throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
   }
   console.log('bookId : ', bookId);
   const response = await httpClient.post(
      `/favorite/${bookId}`,
      {},
      {
         headers: {
            Authorization: `${token}`,
         },
      },
   );
   return response.data;
};

export const unFavoriteBook = async (bookId: string | undefined) => {
   const token = localStorage.getItem('token');
   if (!token) {
      throw new Error('JWT 토큰이 없습니다. 로그인하세요.');
   }
   const response = await httpClient.delete(`/favorite/${bookId}`, {
      headers: {
         Authorization: `${token}`,
      },
   });
   return response.data;
};
