import useToastStore from '@/store/toastStore';
import styled from 'styled-components';
import Toast from './Toast';

const Toastcontainer = () => {
   const toasts = useToastStore((state) => state.toasts);
   return (
      <>
         <ToastcontainerStyle>
            {toasts.map((toast) => (
               <Toast key={toast.id} id={toast.id} message={toast.message} type={toast.type} />
            ))}
         </ToastcontainerStyle>
      </>
   );
};

const ToastcontainerStyle = styled.div`
   position: fixed;
   top: 32px;
   right: 24px;
   z-index: 1000;

   display: flex;
   flex-direction: column;
   gap: 12px;
`;
export default Toastcontainer;
