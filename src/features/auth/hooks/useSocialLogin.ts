import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { IMyInfo } from '@/entities/mypage/model/types';
import { useUserStore } from '@/entities/user/model/store';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * @description 소셜로그인 상태 관리 hook
 * @returns
 */
const useSocialLogin = (onLoginSuccess?: () => void) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUserStore((state) => state);
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    if (accessToken && refreshToken) {
      signIn('credentials', {
        accessToken,
        refreshToken,
        redirect: false,
      }).then((response) => {
        if (response?.ok) {
          setUserFunc();
          if (onLoginSuccess) {
            onLoginSuccess();
          } else {
            router.replace('/');
          }
        }
      });
      return;
    }
  }, [searchParams, router, onLoginSuccess]);

  const setUserFunc = async () => {
    const response = await ApiHelper.get<IMyInfo>(API_URL.MYPAGE.USER_INFO);
    if (response.data.status === 200) {
      console.log('???');
      console.log(response.data.result);
      setUser(response.data.result);
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    try {
      window.location.href = `https://ezcode.my/api/oauth2/authorize/${provider}?redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/signin`;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSocialLogin,
  };
};

export default useSocialLogin;
