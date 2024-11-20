import { BookReviewItem } from '@/models/book.model';
import { http, HttpResponse } from 'msw';
import { fakerKO as faker } from '@faker-js/faker';
import { Banner } from '@/models/banner.model';

const bannersData: Banner[] = [
   {
      id: 1,
      title: 'banner 1',
      description: 'description 1',
      image: 'https://picsum.photos/id/111/1200/400',
      url: 'http://some.url',
      target: '_blank',
   },
   {
      id: 2,
      title: 'banner 2',
      description: 'description 2',
      image: 'https://picsum.photos/id/222/1200/400',
      url: 'http://some.url',
      target: '_self',
   },
   {
      id: 3,
      title: 'banner 3',
      description: 'description 3',
      image: 'https://picsum.photos/id/333/1200/400',
      url: 'http://some.url',
      target: '_blank',
   },
];

export const banners = http.get('http://localhost:5000/banners', () => {
   return HttpResponse.json(bannersData, {
      status: 200,
   });
});
