import { LoginProps } from '@/pages/Login';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import { useNavigate } from 'react-router-dom';
import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { SignupProps } from '@/pages/SignUp';
import { useState } from 'react';

export const useAuth = () => {
   //상태
   const { storeLogin, storeLogout, isLoggedIn } = useAuthStore();
   const navigate = useNavigate();
   const { showAlert } = useAlert();
   //메소드
   const userLogin = (data: LoginProps) => {
      login(data).then(
         (res) => {
            storeLogin(res.token);

            console.log(res.token);
            showAlert('로그인 되었습니다.');
            navigate('/');
         },
         (error) => {
            showAlert('로그인이 실패했습니다.');
         },
      );
   };

   const userSignup = (data: SignupProps) => {
      signup(data).then((res) => {
         showAlert('회원가입이 완료되었습니다.');
         navigate('/login');
      });
   };

   const userResetPassword = (data: SignupProps) => {
      resetPassword(data).then(() => {
         showAlert('비밀번호가 초기화 되었습니다.');
         navigate('/login');
      });
   };

   const [resetRequested, setResetRequested] = useState(false);

   const userResetRequest = (data: SignupProps) => {
      resetRequest(data).then(() => {
         setResetRequested(true);
      });
   };
   //리턴
   return { userLogin, userSignup, userResetPassword, userResetRequest, resetRequested };
};
