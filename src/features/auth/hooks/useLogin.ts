'use client';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
/**
 * @description 로그인 상태 관리 hook
 * @returns 
 */
const useLogin = () => {
    const router = useRouter();
    /** 로그인 정보 */
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });

    /** 로그인 정보 변경 함수 */
    const handleChangeLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }));
    };

    /** 로그인 클릭 함수 */
    const handleSignInClick = async () => {
        try {
            const result = await signIn('credentials', {
                email: loginInfo.email,
                password: loginInfo.password,
                redirect: false,
            });
            if (result?.error) {
                console.log('result', result);
                toast.error(result.error);
                return;
            }
            if (result?.ok) {
                console.log('result', result);
                // document.cookie = `refreshToken=${refreshToken}; max-age=300; path=/; samesite=strict`;
                router.push('/');
            }
        } catch (err) {
            console.error(err);
        }
    }
    return { loginInfo, handleChangeLoginInfo, handleSignInClick };
};

export default useLogin;