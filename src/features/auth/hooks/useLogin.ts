'use client';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useUserStore } from '@/entities/user/model/store';
import { IMyInfo } from '@/entities/mypage/model/types';
import Cookies from 'js-cookie';
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
  // const [errorMessage, setErrorMessage] = useState('');

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
  // const handleSignInError = (pError: string) => {
  //   setErrorMessage(pError);
  // };

  /** 로그인 클릭 함수 */
  const handleSignInClick = async () => {
    try {
      // setErrorMessage('');
      // const result = await signIn('credentials', {
      //   email: loginInfo.email,
      //   password: loginInfo.password,
      //   redirect: false,
      // });
      // console.log('result', result);

      // if (result?.error) {
      //   handleSignInError(result.error);
      //   return;
      // }
      const result = await ApiHelper.post<{ accessToken: string; refreshToken: string }>(
        API_URL.AUTH.SIGN_IN,
        {
          email: loginInfo.email,
          password: loginInfo.password,
        }
      );
      if (result.data.status === 200) {
        Cookies.set('accessToken', result.data.result.accessToken.split(' ')[1], {
          path: '/', // 전체 경로에서 사용
          secure: true, // HTTPS에서만
          sameSite: 'lax', // 기본 보안
        });
        Cookies.set('refreshToken', result.data.result.refreshToken, {
          path: '/', // 전체 경로에서 사용
          secure: true, // HTTPS에서만
          sameSite: 'lax', // 기본 보안
        });
        const response = await ApiHelper.get<IMyInfo>(API_URL.MYPAGE.USER_INFO);
        console.log('weafwefwaef', response);
        if (response.data.status === 200) {
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
    // errorMessage,
  };
};

export default useLogin;
