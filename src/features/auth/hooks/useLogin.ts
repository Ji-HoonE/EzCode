'use client';
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
  /**로그인 검증은 통과했지만, 에러가 있을때*/
  const [requestError, setRequestError] = useState<string | null>(null);
  /** 비밀번호 표시 정보 */
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  /** 비밀번호 표시 함수 */
  const handlePasswordVisible = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  /** 로그인 클릭 함수 */
  const handleSignInClick = async (data: Record<string, unknown>) => {
    try {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });
      console.log('result', result);

      if (result?.error) {
        setRequestError(result.error);
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
    handleSignInClick,
    handlePasswordVisible,
    isPasswordVisible,
    requestError,
  };
};

export default useLogin;
