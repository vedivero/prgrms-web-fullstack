import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import styled from 'styled-components';
import BookReview from '../book/BookReview';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
   reviews: IBookReviewItem[];
}

const MainReview = ({ reviews }: Props) => {
   const sliderSettings = {
      dots: true, // 하단 페이지 네이션과 같은 점 표시
      Infinity: true, //오른쪽 클릭 시, 제한 없이 넘김
      speed: 500, //이미지가 넘어가는 밀리세컨
      slidesToShow: 3, //한번에 표시될 이미지수
      slidesToScroll: 3, //한번에 스크롤 될 이미지 수
   };

   return (
      <>
         <MainReviewStyle>
            <Slider {...sliderSettings}>
               {reviews.map((review) => (
                  <BookReview key={review.id} review={review} />
               ))}
            </Slider>
         </MainReviewStyle>
      </>
   );
};

const MainReviewStyle = styled.div`
   .slick-track {
      padding: 12px 0;
   }

   .slick-slide > div {
      margin: 0 12px;
   }
   .slick-prev:bofore,
   .slick-next:bofore {
      color: #000;
   }
`;
export default MainReview;
