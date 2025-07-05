'use client';
import useSignUp from '../hooks/useSignUp';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const SignupForm = () => {
  const { signUpInfo, handleChangeSignUpInfo, handleSignUpClick, handlePasswordVisible, handlePasswordConfirmVisible, showPassword, showPasswordConfirm, errorMessage } = useSignUp();

  return (
    <div className='w-full h-full'>
      <div className='bg-[#FFFFFFF6] w-full h-full rounded-[17px] py-[15px] px-[33px] flex flex-col items-center'>
        <p className='text-[20px] font-[800] leading-[47px] text-black'>이메일 회원가입</p>
        <div className='flex flex-col mt-[9px] w-full gap-[7px]'>
          <p className='text-[15px] font-[700] text-black pl-[7px]'>이름</p>
          <div className='flex flex-col gap-[6px]'>
            <div className='bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] relative'>
              <Image src="/icons/mail.svg" alt="mail" width={16} height={16} priority className='absolute left-[11px] top-[9px]' />
              <input
                type={'text'}
                data-slot="input"
                className={cn(
                  "bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] w-full border-none",
                  "h-full pl-[35px] pr-[35px]",
                  "shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]"
                )}
                placeholder="이름을 입력해주세요"
                id='name'
                name="username"
                value={signUpInfo.username}
                onChange={handleChangeSignUpInfo}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-[40px] w-full gap-[7px]'>
          <p className='text-[15px] font-[700] text-black pl-[7px]'>이메일</p>
          <div className='flex flex-col gap-[6px]'>
            <div className='bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] relative'>
              <Image src="/icons/mail.svg" alt="mail" width={16} height={16} priority className='absolute left-[11px] top-[9px]' />
              <input
                type={'text'}
                data-slot="input"
                className={cn(
                  "bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] w-full border-none",
                  "h-full pl-[35px] pr-[35px]",
                  "shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]"
                )}
                placeholder="이메일을 입력해주세요"
                id='email'
                name="email"
                value={signUpInfo.email}
                onChange={handleChangeSignUpInfo}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-[40px] w-full gap-[7px]'>
          <p className='text-[15px] font-[700] text-black pl-[7px]'>비밀번호</p>
          <div className='flex flex-col gap-[6px]'>
            <div className='bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] relative'>
              <Image src="/icons/mail.svg" alt="mail" width={16} height={16} priority className='absolute left-[11px] top-[9px]' />
              <input
                type={showPassword ? 'text' : 'password'}
                data-slot="input"
                className={cn(
                  "bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] w-full border-none",
                  "h-full pl-[35px] pr-[35px]",
                  "shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]"
                )}
                placeholder="비밀번호를 입력해주세요."
                id='password'
                name="password"
                value={signUpInfo.password}
                onChange={handleChangeSignUpInfo}
              />
              <Image src={"/icons/eyeOff.svg"} alt="eyeOff" width={16} height={16} priority className='absolute right-[10px] top-[9px]' onClick={handlePasswordVisible} />
            </div>
          </div>
          <div className='flex flex-col gap-[6px]'>
            <div className='bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] relative'>
              <Image src="/icons/mail.svg" alt="mail" width={16} height={16} priority className='absolute left-[11px] top-[9px]' />
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                data-slot="input"
                className={cn(
                  "bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] w-full border-none",
                  "h-full pl-[35px] pr-[35px]",
                  "shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]"
                )}
                placeholder="비밀번호를 확인해주세요."
                id='passwordConfirm'
                name="passwordConfirm"
                value={signUpInfo.passwordConfirm}
                onChange={handleChangeSignUpInfo}
              />
              <Image src="/icons/eyeOff.svg" alt="eyeOff" width={16} height={16} priority className='absolute right-[10px] top-[9px]' onClick={handlePasswordConfirmVisible} />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-start mt-[13px]'>
          <div className='text-[9px] font-[400] text-black flex items-center'>
            <p className='text-[#666766] text-[10px] font-[700] underline underline-offset-[2px]'>이용약관</p>
            <p className='text-[10px] text-[#666766] font-[400] pl-[2px] pr-[2px]'>과</p>
            <p className='text-[#666766] text-[10px] font-[700] underline underline-offset-[2px]'>개인정보 처리방침</p>
            <p className='text-[10px] text-[#666766] font-[400] pl-[2px]'>에 동의하고 가입하기</p>
          </div>
        </div>
        {errorMessage && <div className='w-full mt-[7px] flex items-center gap-[4px]'>
          <Image src="/icons/alert.svg" alt="error" width={10} height={10} priority className='mb-[2px]' />
          <span className='text-[10px] font-[700] text-[#EC3030]'>{errorMessage}</span>
        </div>}
        <div className='flex flex-col w-full gap-[6px] mt-[7px]'>
          <button onClick={handleSignUpClick} className='h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] bg-[#969696] text-white text-[15px] font-[800]'>회원가입</button>
        </div>
      </div>
    </div >

  );
}

export default SignupForm;



