'use client';
import { API_CONSTANTS } from '@/api/constants/api.constants';
import { useSignUpMutation } from '@/query/auth/auth';
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

    /** 회원가입 정보 변경 함수 */
    const handleChangeSignUpInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpInfo((prev) => ({ ...prev, [name]: value }));
    };

    /** 회원가입 클릭 함수 */
    const handleSignUpClick = async () => {
        try {
            const response = await mutateAsync(signUpInfo);
            if (response.data.status === API_CONSTANTS.CODE.CREATED) {
                router.push('/signin');
            }
        } catch (err) {
            console.error(err);
        }
    }

    return { signUpInfo, handleChangeSignUpInfo, handleSignUpClick };
};

export default useSignUp;