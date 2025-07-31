import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * @description 소셜로그인 상태 관리 hook
 * @returns
 */
const useSocialLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
          router.replace('/');
        }
      });
      return;
    }
  }, [searchParams, router]);

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
