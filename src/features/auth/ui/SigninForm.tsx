'use client';
import useLogin from '../hooks/useLogin';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
import Image from 'next/image';

const SigninForm = () => {
  const router = useRouter();
  const { loginInfo, handleChangeLoginInfo, handleSignInClick, handlePasswordVisible, isPasswordVisible, errorMessage } = useLogin();

  return (
    <div className='w-full h-full'>
      <div className='bg-[#FFFFFFF6] w-full h-full rounded-[25px] py-[23px] px-[50px] flex flex-col items-center'>
        <p className='text-[30px] font-[800] leading-[70px] text-black'>로그인</p>
        <div className='flex flex-col mt-[14px] w-full gap-[9px]'>
          <div className='bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] relative'>
            <Image src="/icons/mail.svg" alt="mail" width={24} height={24} priority className='absolute left-[17px] top-[13px]' />
            <input
              type={'text'}
              data-slot="input"
              className={cn(
                "bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] w-full border-none",
                "h-full pl-[52px] pr-[52px]",
                "shadow-[inset_0_3px_3px_0_rgba(0,0,0,0.25)]"
              )}
              placeholder="이메일"
              name="email"
              value={loginInfo.email}
              onChange={handleChangeLoginInfo}
            />
          </div>
          <div className='bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] relative'>
            <Image src="/icons/lock.svg" alt="lock" width={24} height={24} priority className='absolute left-[17px] top-[13px]' />
            <input
              data-slot="input"
              className={cn(
                "bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] w-full border-none",
                "h-full pl-[52px] pr-[52px]",
                "shadow-[inset_0_3px_3px_0_rgba(0,0,0,0.25)]"
              )}
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="비밀번호"
              name="password"
              value={loginInfo.password}
              onChange={handleChangeLoginInfo}
            />
            <Image src="/icons/eyeOff.svg" alt="eyeOff" width={24} height={24} priority className='absolute right-[15px] top-[13px]' onClick={handlePasswordVisible} />
          </div>
          {errorMessage && <div className='flex items-center gap-[6px]'><Image src="/icons/alert.svg" alt="error" width={15} height={15} priority className='mb-[3px]' /><span className='text-[15px] font-[700] text-[#EC3030]'>{errorMessage}</span></div>}
        </div>
        <div className='flex flex-col mt-[20px] w-full gap-[9px]'>
          <button onClick={handleSignInClick} className='h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] bg-[#969696] text-white text-[22px] font-[800]'>로그인</button>
          <button className='text-black rounded-[10px] h-[55px] text-[22px] font-[800] border-[1px] border-[#6C6C6C]' onClick={() => router.push('/signup')}>이메일 회원가입</button>
          <p className='text-[12px] font-[400] text-[#6C6C6C] text-end decoration-black underline underline-offset-[3px]' onClick={() => router.push('/find/id')}>비밀번호를 잊었어요.</p>
        </div>
        <p className='text-[20px] font-[600] text-black leading-[70px]'>SNS 계정으로 시작하기</p>
        <div className="w-full flex justify-center gap-[69px]" >
          <div className='flex flex-col items-center'>
            <Image src="/icons/google.svg" alt="eye" width={89} height={89} priority />
            <p className='text-[16px] font-[800] text-black'>Google</p>
          </div>
          <div className='flex flex-col items-center'>
            <Image src="/icons/github.svg" alt="eye" width={89} height={89} priority />
            <p className='text-[16px] font-[800] text-black'>Github</p>
          </div>
        </div>
        <div className='text-[14px] font-[400] text-black leading-[50px] flex justify-center'>
          <p className='text-[#666766] text-[12px] font-[700] underline underline-offset-[3px]'>이용약관</p><p className='text-[12px] text-[#666766] font-[400] pl-[3px] pr-[3px]'>과</p><p className='text-[#666766] text-[12px] font-[700] underline underline-offset-[3px]'>개인정보 처리방침</p><p className='text-[12px] text-[#666766] font-[400] pl-[3px]'>에 동의하고 가입하기</p>
        </div>
      </div>
    </div >
  );
}

export default SigninForm;