'use client';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
/**
 * @description 로그인 상태 관리 hook
 * @returns
 */
const useLogin = (onLoginSuccess?: () => void) => {
  const router = useRouter();

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
      if (result?.error) {
        // handleSignInError(result.error);
        return;
      }
      if (result?.ok) {
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          router.replace('/');
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
  };
};

export default useLogin;
