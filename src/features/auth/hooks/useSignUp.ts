'use client';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import { useSignUpMutation } from '@/entities/auth/model/mutation/auth.mutation';
import { useState } from 'react';
import { useAuthStore } from '../store/authSlice';
import { useShallow } from 'zustand/shallow';
import { toast } from 'sonner';

/**
 * @description 회원가입 상태 관리 hook
 * @returns
 */
const useSignUp = () => {
  const { setActiveTab } = useAuthStore(
    useShallow((state) => ({
      setActiveTab: state.setActiveTab,
    }))
  );
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
        toast.success('회원가입에 완료', {
          richColors: false,
          style: {
            background: '#00d084',
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '16px',
            border: 'none',
          },
        });
        setActiveTab('login');
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
    } catch (err) {
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
