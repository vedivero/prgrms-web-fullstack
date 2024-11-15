import { styled } from 'styled-components';
import logo from '../../assets/images/logo4.jpg';
import { FaSignInAlt, FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { useAuthStore } from '../../store/authStore';

const Header = () => {
   const { category } = useCategory();
   const { isLoggedIn, storeLogout } = useAuthStore();

   return (
      <HeaderStyle>
         <h1 className='logo'>
            <Link to='/'>
               <img src={logo} alt='book store' />
            </Link>
         </h1>
         <nav className='category'>
            <ul>
               {category.map((item) => (
                  <li key={item.id}>
                     <StyledCategoryLink to={item.id === null ? `/books` : `/book?category_id=${item.id}`}>
                        {item.name}
                     </StyledCategoryLink>
                  </li>
               ))}
            </ul>
         </nav>
         <nav className='auth'>
            {isLoggedIn && (
               <ul>
                  <li>
                     <StyledCategoryLink to='/cart'>
                        <FaSignInAlt />
                        장바구니
                     </StyledCategoryLink>
                  </li>
                  <li>
                     <StyledCategoryLink to='/orderList'>
                        <FaSignInAlt />
                        주문내역
                     </StyledCategoryLink>
                  </li>
                  <li>
                     <button onClick={storeLogout}>로그아웃</button>
                  </li>
               </ul>
            )}
            {!isLoggedIn && (
               <ul>
                  <li>
                     <StyledCategoryLink to='/login'>
                        <FaSignInAlt />
                        로그인
                     </StyledCategoryLink>
                  </li>
                  <li>
                     <StyledCategoryLink to='/signUp'>
                        <FaRegUser />
                        회원가입
                     </StyledCategoryLink>
                  </li>
               </ul>
            )}
         </nav>
      </HeaderStyle>
   );
};

const HeaderStyle = styled.header`
   width: 100%;
   margin: 0 auto;
   max-width: ${({ theme }) => theme.layout.width.large};

   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 20px 0;
   border-bottom: 1px solid ${({ theme }) => theme.color.background};

   .category {
      ul {
         display: flex;
         gap: 32px;
      }
   }
   .auth {
      ul {
         display: flex;
         gap: 16px;
      }
   }
   .logo {
      img {
         width: 150px;
      }
   }
`;

const StyledCategoryLink = styled(Link)`
   font-size: 1.5rem;
   font-weight: 600;
   text-decoration: none;
   color: ${({ theme }) => theme.color.text};

   &:hover {
      color: ${({ theme }) => theme.color.primary};
   }
`;

const StyledAuthLink = styled(Link)`
   font-size: 1rem;
   font-weight: 600;
   text-decoration: none;
   display: flex;
   align-items: center;
   line-height: 1;

   svg {
      margin-right: 6px;
   }

   &:hover {
      color: ${({ theme }) => theme.color.primary};
   }
`;

export default Header;
