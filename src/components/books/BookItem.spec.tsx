import React from 'react';
import { render } from '@testing-library/react';
import BookItem from './BookItem';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { Book } from '../../models/book.model';

const dummyBook: Book = {
   id: 1,
   title: 'Dummy Book',
   img: 5,
   category_id: 1,
   summary: 'Dummy Summary',
   author: 'Dummy Author',
   price: 10000,
   favorites: 1,
   form: 'paperback',
   isbn: 'Dummy ISBN',
   detail: 'Dummy Detail',
   pages: 100,
   contents: 'Dummy Contents',
   pub_date: '2021-01-01',
   name: '수필',
};

describe('BookItem', () => {
   it('렌더 여부', () => {
      const { getByText, getByAltText } = render(
         <BookStoreThemeProvider>
            <BookItem book={dummyBook} />
         </BookStoreThemeProvider>,
      );

      expect(getByText(dummyBook.title)).toBeInTheDocument();
      expect(getByText(dummyBook.summary)).toBeInTheDocument();
      expect(getByText(dummyBook.author)).toBeInTheDocument();
      expect(getByText('10,000%')).toBeInTheDocument();
      expect(getByText(dummyBook.favorites)).toBeInTheDocument();
      expect(getByAltText(dummyBook.title)).toHaveAttribute(
         'src',
         'https://picsum.photos/id/${dummyBook.img}/300/300',
      );
   });
});
