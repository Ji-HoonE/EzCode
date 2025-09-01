'use client';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useUserStore } from '@/entities/user/model/store';
import { IMyInfo } from '@/entities/mypage/model/types';
/**
 * @description 로그인 상태 관리 hook
 * @returns
 */
const useLogin = (onLoginSuccess?: () => void) => {
  const { setUser } = useUserStore((state) => state);
  const router = useRouter();
  /** 로그인 정보 */
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  /** 비밀번호 표시 정보 */
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /** 로그인 에러 정보*/
  const [errorMessage, setErrorMessage] = useState('');

  /** 로그인 정보 변경 함수 */
  const handleChangeLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  /** 비밀번호 표시 함수 */
  const handlePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  /** 로그인 에러 함수 */
  const handleSignInError = (pError: string) => {
    setErrorMessage(pError);
  };

  /** 로그인 클릭 함수 */
  const handleSignInClick = async () => {
    try {
      setErrorMessage('');
      const result = await signIn('credentials', {
        email: loginInfo.email,
        password: loginInfo.password,
        redirect: false,
      });
      console.log('result', result);

      if (result?.error) {
        handleSignInError(result.error);
        return;
      }
      if (result?.ok) {
        const response = await ApiHelper.get<IMyInfo>(API_URL.MYPAGE.USER_INFO);
        if (response.data.status === 200) {
          console.log('???');
          console.log(response.data.result);
          setUser(response.data.result);
        }
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.push('/');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return {
    loginInfo,
    handleChangeLoginInfo,
    handleSignInClick,
    handlePasswordVisible,
    isPasswordVisible,
    errorMessage,
  };
};

export default useLogin;
