'use client';
import { API_CONSTANTS, API_URL } from '@/api/constants/api.constants';
import { useSignUpMutation } from '@/entities/auth/model/mutation/auth.mutation';
import { useState } from 'react';

import { toast } from 'sonner';
import Cookies from 'js-cookie';
import ApiHelper from "@/api/client/api";
import { useUserStore } from "@/entities/user/model/store";
import { IMyInfo } from "@/entities/mypage/model/types";
import { useRouter } from "next/navigation";
/**
 * @description 회원가입 상태 관리 hook
 * @returns
 */
const useSignUp = () => {
    const { setUser } = useUserStore((state) => state);
    const router = useRouter()
  // const { setActiveTab } = useAuthStore(
  //   useShallow((state) => ({
  //     setActiveTab: state.setActiveTab,
  //   }))
  // );
  /** 로그인 Api 요청 mutation */
  const { mutateAsync } = useSignUpMutation();

  /** 회원가입 정보 */
  // const [signUpInfo, setSignUpInfo] = useState({
  //   email: '',
  //   password: '',
  //   passwordConfirm: '',
  //   username: '',
  //   nickname: '',
  //   age: 0,
  // });

  /** 회원가입 에러 메시지 */
  // const [errorMessage, setErrorMessage] = useState('');

  /** 비밀번호 보여주기 상태 */
  const [showPassword, setShowPassword] = useState(false);

  /** 비밀번호 확인 보여주기 상태 */
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  /** 회원가입 정보 변경 함수 */
  // const handleChangeSignUpInfo = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setSignUpInfo((prev) => ({ ...prev, [name]: value }));
  // };

  /** 회원가입 에러 함수 */
  // const handleSignUpError = (pError: string) => {
  //   setErrorMessage(pError);
  // };

  /** 회원가입 클릭 함수 */
  const handleSignUpClick = async (data: Record<string, unknown>) => {
    try {
      // setErrorMessage('');
      const response = await mutateAsync({
        email: data.email as string,
        password: data.password as string,
        passwordConfirm: data.passwordCheck as string,
        username: data.name as string,
        nickname: '',
        age: 0,
      });
      if (response.data.status === API_CONSTANTS.CODE.CREATED) {
        toast.success('회원가입을 완료하였습니다.', {
          richColors: false,
          style: {
            background: '#00d084',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
          },
        });
        // setActiveTab('login');
        console.log('response',response)
           if (response.data.status === 201) {
        Cookies.set('accessToken', response.data.result.accessToken.split(' ')[1], {
          path: '/', // 전체 경로에서 사용
          secure: true, // HTTPS에서만
          sameSite: 'lax', // 기본 보안
        });
        Cookies.set('refreshToken', response.data.result.refreshToken, {
          path: '/', // 전체 경로에서 사용
          secure: true, // HTTPS에서만
          sameSite: 'lax', // 기본 보안
        });
        const result = await ApiHelper.get<IMyInfo>(API_URL.MYPAGE.USER_INFO);
        if (result.data.status === 200) {
          setUser(result.data.result);
        }
        router.push('/')
      }
      } else {
        toast.error(response.data.message || '로그인에 실패했습니다.', {
          richColors: false,
          style: {
            fontWeight: 'bold',
            fontSize: '16px',
          },
        });
        return;
      }
    } catch {
      toast.error('알 수 없는 오류가 발생했습니다.', {
        richColors: false,
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      });
    }
  };
  /** 비밀번호 보이기/숨기기 토글 함수 */
  const handlePasswordVisible = () => {
    setShowPassword(!showPassword);
  };
  /** 비밀번호 확인 보이기/숨기기 토글 함수 */
  const handlePasswordConfirmVisible = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  return {
    // signUpInfo,
    // handleChangeSignUpInfo,
    handleSignUpClick,
    handlePasswordVisible,
    handlePasswordConfirmVisible,
    showPassword,
    showPasswordConfirm,
    // errorMessage,
  };
};

export default useSignUp;
