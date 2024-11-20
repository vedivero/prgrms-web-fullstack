import Title from '@/components/common/Title';
import MainReview from '@/components/main/MainReview';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';

const Home = () => {
   //훅에서 데이터 받아오기
   const { reviews } = useMain();

   return (
      <>
         <HomeStyle>
            <section className='section'>
               <Title size='large'>베스트 셀러</Title>
            </section>
            <section className='section'>
               <Title size='large'>신간 안내</Title>
            </section>
            <section className='section'>
               <Title size='large'>리뷰</Title>
               <MainReview reviews={reviews} />
            </section>
         </HomeStyle>
      </>
   );
};

const HomeStyle = styled.div``;
export default Home;
