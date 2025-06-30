'use client';
import { Input } from '@/components/ui/input';
import useLogin from '../hooks/useLogin';
import { useRouter } from 'next/navigation';

const SigninForm = () => {
  const router = useRouter();
  const { loginInfo, handleChangeLoginInfo, handleSignInClick } = useLogin();

  return (
    <div className='pt-[47px] pb-[50px] px-[65px] flex flex-col items-center'>
      <p>Login</p>
      <div className='flex flex-col gap-[13px] mt-[27px]'>
        <Input
          type="text"
          placeholder="이메일"
          name="email"
          value={loginInfo.email}
          onChange={handleChangeLoginInfo}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={loginInfo.password}
          onChange={handleChangeLoginInfo}
        />
      </div>
      <div className='flex flex-col mt-[25px] gap-[20px]'>
        <button onClick={handleSignInClick}>로그인</button>
        <button onClick={() => router.push('/signup')}>이메일 회원가입</button>
      </div>
      <div className='flex justify-end w-full mt-[13px]'>
        <p onClick={() => router.push('/find/id')}>아이디 찾기</p>
      </div>
      <div className='flex justify-end w-full mt-[13px]'>
        <p onClick={() => router.push('/find/password')}>비밀번호 찾기</p>
      </div>
      <div className="border-[1px] w-full mt-[16px]" />
    </div >
  );
}

export default SigninForm;