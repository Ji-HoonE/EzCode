'use client';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import { useSignUpMutation } from '@/entities/auth/model/mutation/auth.mutation';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

/**
 * @description 회원가입 상태 관리 hook
 * @returns
 */
const useSignUp = () => {
  /** 로그인 Api 요청 mutation */
  const { mutateAsync } = useSignUpMutation();

  const router = useRouter();

  /** 회원가입 정보 */
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    nickname: '',
    age: 0,
  });

  /** 회원가입 에러 메시지 */
  const [errorMessage, setErrorMessage] = useState('');

  /** 비밀번호 보여주기 상태 */
  const [showPassword, setShowPassword] = useState(false);

  /** 비밀번호 확인 보여주기 상태 */
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  /** 회원가입 정보 변경 함수 */
  const handleChangeSignUpInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({ ...prev, [name]: value }));
  };

  /** 회원가입 에러 함수 */
  const handleSignUpError = (pError: string) => {
    setErrorMessage(pError);
  };

  /** 회원가입 클릭 함수 */
  const handleSignUpClick = async () => {
    try {
      setErrorMessage('');
      const response = await mutateAsync(signUpInfo);
      console.log('response', response);
      if (response.data.status !== API_CONSTANTS.CODE.CREATED) {
        handleSignUpError(response.data.message);
        return;
      }
      if (response.data.status === API_CONSTANTS.CODE.CREATED) {
        router.push('/signin');
      }
    } catch (err) {
      console.error(err);
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
    signUpInfo,
    handleChangeSignUpInfo,
    handleSignUpClick,
    handlePasswordVisible,
    handlePasswordConfirmVisible,
    showPassword,
    showPasswordConfirm,
    errorMessage,
  };
};

export default useSignUp;
