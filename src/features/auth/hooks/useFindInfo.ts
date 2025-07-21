import { API_CONSTANTS } from '@/api/constants/api.constants';
import { useFindPasswordMutation } from '@/entities/auth/model/mutation/auth.mutation';

import { ChangeEvent, useState } from 'react';

/**
 *  @description 비밀번호 찾기 hook
 */
export const useFindInfo = () => {
  const [findEmail, setFindEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { mutateAsync: findPasswordMutation } = useFindPasswordMutation();

  const handleChangeFindPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFindEmail(value);
  };

  const handleFindPasswordClick = async () => {
    try {
      const res = await findPasswordMutation({
        email: findEmail,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/find`,
      });
      if (res.data.status == API_CONSTANTS.CODE.OK) {
        setSuccessMessage('인증메일이 발송되었습니다.');
        setErrorMessage('');
      }
    } catch (error: unknown) {
      setErrorMessage((error as Error).message);
      setSuccessMessage('');
    }
  };

  return {
    findEmail,
    handleChangeFindPassword,
    handleFindPasswordClick,
    errorMessage,
    successMessage,
  };
};
