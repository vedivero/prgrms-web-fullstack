export interface Book {
   id: number;
   book_id: number;
   title: string;
   img: number;
   category_id: number;
   summary: string;
   author: string;
   price: number;
   favorites: number;
   form: string;
   isbn: string;
   detail: string;
   pages: number;
   contents: string;
   pub_date: string;
   name: string;
}

export interface BookDetail extends Book {
   categoryName: string;
   favorited: boolean;
}
