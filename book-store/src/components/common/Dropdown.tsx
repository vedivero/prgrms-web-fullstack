import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
   children: React.ReactNode; //탭 내 목록을 children으로 처리
   toggleButton: React.ReactNode;
   isOpen?: boolean;
}

interface DropDownStyleProps {
   $open: boolean;
}

const Dropdown = ({ children, toggleButton, isOpen = false }: Props) => {
   const [open, setOpen] = useState(isOpen);

   const dropdownRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleOutSideClick = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setOpen(false);
         }
         document.addEventListener('mousedown', handleOutSideClick);
      };
      return () => {
         document.removeEventListener('mousedown', handleOutSideClick);
      };
   }, [dropdownRef]);

   return (
      <>
         <DropdownStyle $open={open} ref={dropdownRef}>
            <button className='toggle' onClick={() => setOpen(!open)}>
               {toggleButton}
            </button>
            {open && <div className='pannel'>{children}</div>}
         </DropdownStyle>
      </>
   );
};

const DropdownStyle = styled.div<DropDownStyleProps>`
   position: relative;
   button {
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
   }
   svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) => ($open ? theme.color.primary : theme.color.text)};
   }

   .pannel {
      position: absolute;
      top: 40px;
      right: 0;
      padding: 16px;
      background: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: ${({ theme }) => theme.borderRadius.default}
      z-index: 10;
   }
`;

export default Dropdown;
