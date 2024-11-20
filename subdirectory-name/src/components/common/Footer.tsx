import React from 'react';
import logo from '../../assets/images/logo4.jpg';
import styled from 'styled-components';

const Footer = () => {
   return (
      <FooterStyle>
         <h1 className='logo'>{/* <img src={logo} alt='book store' /> */}</h1>
         <div className='copyright'>
            <p>copyright(c), 2024, Book Store</p>
         </div>
      </FooterStyle>
   );
};

const FooterStyle = styled.footer`
   width: 100%;
   margin: 0 auto;
   max-width: ${({ theme }) => theme.layout.width.large};
   border-top: 1px solid ${({ theme }) => theme.color.background};
   padding: 20px 0;
   display: flex;
   // justify-content: space-between;

   .logo {
      img {
         width: 180px;
      }
   }
`;

export default Footer;
