'use client';
import useLogin from '../hooks/useLogin';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import useSocialLogin from '../hooks/useSocialLogin';

const SigninForm = () => {
  const router = useRouter();
  const {
    loginInfo,
    handleChangeLoginInfo,
    handleSignInClick,
    handlePasswordVisible,
    isPasswordVisible,
    errorMessage,
  } = useLogin();

  const { handleSocialLogin } = useSocialLogin();

  return (
    <div className="w-full h-full">
      <div className="bg-[#FFFFFFF6] w-full h-full rounded-[17px] py-[15px] px-[33px] flex flex-col items-center">
        <p className="text-[20px] font-[800] leading-[47px] text-black">로그인</p>
        <div className="flex flex-col mt-[9px] w-full gap-[6px]">
          <div className="bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] relative">
            <Image
              src="/icons/mail.svg"
              alt="mail"
              width={16}
              height={16}
              priority
              className="absolute left-[11px] top-[9px]"
            />
            <input
              type={'text'}
              data-slot="input"
              className={cn(
                'bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] w-full border-none',
                'h-full pl-[35px] pr-[35px]',
                'shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]'
              )}
              placeholder="이메일"
              name="email"
              value={loginInfo.email}
              onChange={handleChangeLoginInfo}
            />
          </div>
          <div className="bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] relative">
            <Image
              src="/icons/lock.svg"
              alt="lock"
              width={16}
              height={16}
              priority
              className="absolute left-[11px] top-[9px]"
            />
            <input
              data-slot="input"
              className={cn(
                'bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] w-full border-none',
                'h-full pl-[35px] pr-[35px]',
                'shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]'
              )}
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="비밀번호"
              name="password"
              value={loginInfo.password}
              onChange={handleChangeLoginInfo}
            />
            <Image
              src="/icons/eyeOff.svg"
              alt="eyeOff"
              width={16}
              height={16}
              priority
              className="absolute right-[10px] top-[9px]"
              onClick={handlePasswordVisible}
            />
          </div>
          {errorMessage && (
            <div className="flex items-center gap-[4px]">
              <Image
                src="/icons/alert.svg"
                alt="error"
                width={10}
                height={10}
                priority
                className="mb-[2px]"
              />
              <span className="text-[10px] font-[700] text-[#EC3030]">{errorMessage}</span>
            </div>
          )}{' '}
          {/* 6->4, 15->10, 3->2, 15->10 */}
        </div>
        <div className="flex flex-col mt-[13px] w-full gap-[6px]">
          <button
            onClick={handleSignInClick}
            className="h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] bg-[#969696] text-white text-[15px] font-[800]"
          >
            로그인
          </button>
          <button
            className="text-black rounded-[7px] h-[37px] text-[15px] font-[800] border-[1px] border-[#6C6C6C]"
            onClick={() => router.push('/signup')}
          >
            이메일 회원가입
          </button>
          <p
            className="text-[10px] font-[400] text-[#6C6C6C] text-end decoration-black underline underline-offset-[2px]"
            onClick={() => router.push('/find')}
          >
            비밀번호를 잊었어요.
          </p>
        </div>
        <p className="text-[13px] font-[600] text-black leading-[47px]">SNS 계정으로 시작하기</p>
        <div className="w-full flex justify-center gap-[46px]">
          <div className="flex flex-col items-center">
            <Image
              src="/icons/google.svg"
              alt="eye"
              width={60}
              height={60}
              priority
              onClick={() => handleSocialLogin('google')}
            />
            <p className="text-[11px] font-[800] text-black">Google</p>
          </div>
          <div className="flex flex-col items-center" onClick={() => handleSocialLogin('github')}>
            <Image src="/icons/github.svg" alt="eye" width={60} height={60} priority />
            <p className="text-[11px] font-[800] text-black">Github</p>
          </div>
        </div>
        <div className="text-[9px] font-[400] text-black leading-[33px] flex justify-center">
          <p className="text-[#666766] text-[10px] font-[700] underline underline-offset-[2px]">
            이용약관
          </p>
          <p className="text-[10px] text-[#666766] font-[400] pl-[2px] pr-[2px]">과</p>
          <p className="text-[#666766] text-[10px] font-[700] underline underline-offset-[2px]">
            개인정보 처리방침
          </p>
          <p className="text-[10px] text-[#666766] font-[400] pl-[2px]">에 동의하고 가입하기</p>
        </div>
      </div>
    </div >
  );
};

export default SigninForm;
