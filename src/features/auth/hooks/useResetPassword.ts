'use client';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import {
  useResetPasswordMutation,
  useVerifyResetPasswordQuery,
} from '@/entities/auth/model/mutation/auth.mutation';

import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

/**
 * @description 비밀번호 변경 hook
 */
const useResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data } = useVerifyResetPasswordQuery({
    email: searchParams.get('email') || '',
    key: searchParams.get('key') || '',
  });

  /** 비밀번호 변경 뮤테이션 */
  const { mutateAsync: resetPasswordMutation } = useResetPasswordMutation();

  /** 비밀번호 변경 정보 */
  const [resetPasswordInfo, setResetPasswordInfo] = useState({
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isNewPasswordConfirmVisible, setIsNewPasswordConfirmVisible] = useState(false);

  const handleNewPasswordVisible = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };
  const handleNewPasswordConfirmVisible = () => {
    setIsNewPasswordConfirmVisible(!isNewPasswordConfirmVisible);
  };

  /** 비밀번호 변경 정보 변경 */
  const handleChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetPasswordInfo({
      ...resetPasswordInfo,
      [name]: value,
    });
  };

  /** 비밀번호 변경 클릭 */
  const handleResetPasswordClick = async () => {
    try {
      const res = await resetPasswordMutation({
        tempResetToken: (data?.data?.result?.tempResetToken || '').replace('Bearer ', '').trim(),
        newPassword: resetPasswordInfo.newPassword,
        newPasswordConfirm: resetPasswordInfo.newPasswordConfirm,
      });

      if (res.data.status === API_CONSTANTS.CODE.OK) {
        router.push('/signin');
      } else {
        setErrorMessage(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    resetPasswordInfo,
    handleChangeNewPassword,
    handleResetPasswordClick,
    isNewPasswordVisible,
    isNewPasswordConfirmVisible,
    handleNewPasswordVisible,
    handleNewPasswordConfirmVisible,
    errorMessage,
  };
};

export default useResetPassword;
