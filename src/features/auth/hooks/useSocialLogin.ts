import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { IMyInfo } from '@/entities/mypage/model/types';
import { useUserStore } from '@/entities/user/model/store';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
/**
 * @description 소셜로그인 상태 관리 hook
 * @returns
 */
const useSocialLogin = (onLoginSuccess?: () => void) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setUser } = useUserStore((state) => state);
  // useEffect(() => {
  //   const accessToken = searchParams.get('accessToken');
  //   const refreshToken = searchParams.get('refreshToken');
  //   if (accessToken && refreshToken) {
  //     signIn('credentials', {
  //       accessToken,
  //       refreshToken,
  //       redirect: false,
  //     }).then((response) => {
  //       if (response?.ok) {
  //         setUserFunc();
  //         if (onLoginSuccess) {
  //           onLoginSuccess();
  //         } else {
  //           router.replace('/');
  //         }
  //       }
  //     });
  //     return;
  //   }
  // }, [searchParams, router, onLoginSuccess]);
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (!accessToken || !refreshToken) return;

    const login = async () => {
      // 쿠키 저장
      Cookies.set('accessToken', accessToken, {
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
      Cookies.set('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: 'lax',
      });

      try {
        // 유저 정보 조회
        const response = await ApiHelper.get<IMyInfo>(API_URL.MYPAGE.USER_INFO);
        if (response.data.status === 200) {
          setUser(response.data.result);
        }

        // 성공 시 콜백 or 메인 페이지로 이동
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.replace('/');
        }
      } catch (err: unknown) {
        console.error('Social login user info fetch failed', err);
        // 실패 시 알림이나 리다이렉트 처리 가능
      }
    };

    login();
  }, [searchParams, router, onLoginSuccess, setUser]);

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
