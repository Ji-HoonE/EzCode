'use client';
import useSignUp from '../hooks/useSignUp';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const SignupForm = () => {
  const { signUpInfo, handleChangeSignUpInfo, handleSignUpClick, handlePasswordVisible, handlePasswordConfirmVisible, showPassword, showPasswordConfirm, errorMessage } = useSignUp();

  return (
    <div className='w-full h-full'>
      <div className='bg-[#FFFFFFF6] w-full h-full rounded-[25px] py-[23px] px-[50px] flex flex-col items-center'>
        <p className='text-[30px] font-[800] leading-[70px] text-black'>이메일 회원가입</p>
        <div className='flex flex-col mt-[14px] w-full gap-[10px]'>
          <p className='text-[20px] font-[700] text-black pl-[10px]'>이름</p>
          <div className='flex flex-col gap-[9px]'>
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
                placeholder="이름을 입력해주세요"
                id='name'
                name="username"
                value={signUpInfo.username}
                onChange={handleChangeSignUpInfo}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-[60px] w-full gap-[10px]'>
          <p className='text-[20px] font-[700] text-black pl-[10px]'>이메일</p>
          <div className='flex flex-col gap-[9px]'>
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
                placeholder="이메일을 입력해주세요"
                id='email'
                name="email"
                value={signUpInfo.email}
                onChange={handleChangeSignUpInfo}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-[60px] w-full gap-[10px]'>
          <p className='text-[20px] font-[700] text-black pl-[10px]'>비밀번호</p>
          <div className='flex flex-col gap-[9px]'>
            <div className='bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] relative'>
              <Image src="/icons/mail.svg" alt="mail" width={24} height={24} priority className='absolute left-[17px] top-[13px]' />
              <input
                type={showPassword ? 'text' : 'password'}
                data-slot="input"
                className={cn(
                  "bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] w-full border-none",
                  "h-full pl-[52px] pr-[52px]",
                  "shadow-[inset_0_3px_3px_0_rgba(0,0,0,0.25)]"
                )}
                placeholder="비밀번호를 입력해주세요."
                id='password'
                name="password"
                value={signUpInfo.password}
                onChange={handleChangeSignUpInfo}
              />
              <Image src={"/icons/eyeOff.svg"} alt="eyeOff" width={24} height={24} priority className='absolute right-[15px] top-[13px]' onClick={handlePasswordVisible} />
            </div>
          </div>
          <div className='flex flex-col gap-[9px]'>
            <div className='bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] relative'>
              <Image src="/icons/mail.svg" alt="mail" width={24} height={24} priority className='absolute left-[17px] top-[13px]' />
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                data-slot="input"
                className={cn(
                  "bg-[#FFFFFFF6] text-black h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] w-full border-none",
                  "h-full pl-[52px] pr-[52px]",
                  "shadow-[inset_0_3px_3px_0_rgba(0,0,0,0.25)]"
                )}
                placeholder="비밀번호를 확인해주세요."
                id='passwordConfirm'
                name="passwordConfirm"
                value={signUpInfo.passwordConfirm}
                onChange={handleChangeSignUpInfo}
              />
              <Image src="/icons/eyeOff.svg" alt="eyeOff" width={24} height={24} priority className='absolute right-[15px] top-[13px]' onClick={handlePasswordConfirmVisible} />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-start mt-[20px]'>
          <div className='text-[14px] font-[400] text-black flex items-center'>
            <p className='text-[#666766] text-[12px] font-[700] underline underline-offset-[3px]'>이용약관</p><p className='text-[12px] text-[#666766] font-[400] pl-[3px] pr-[3px]'>과</p><p className='text-[#666766] text-[12px] font-[700] underline underline-offset-[3px]'>개인정보 처리방침</p><p className='text-[12px] text-[#666766] font-[400] pl-[3px]'>에 동의하고 가입하기</p>
          </div>
        </div>
        {errorMessage && <div className='w-full mt-[10px] flex items-center gap-[6px]'><Image src="/icons/alert.svg" alt="error" width={15} height={15} priority className='mb-[3px]' /><span className='text-[15px] font-[700] text-[#EC3030]'>{errorMessage}</span></div>}
        <div className='flex flex-col w-full gap-[9px] mt-[10px]'>
          <button onClick={handleSignUpClick} className='h-[55px] border-[1px] border-[#DEDEDE] rounded-[10px] bg-[#969696] text-white text-[22px] font-[800]' >회원가입</button>
        </div>
      </div>
    </div >

  );
}

export default SignupForm;




// <div>
// <Input
//   type="text"
//   placeholder="username"
//   name="username"
//   value={signUpInfo.username}
//   onChange={handleChangeSignUpInfo}
// />
// <Input
//   type="text"
//   placeholder="nickname"
//   name="nickname"
//   value={signUpInfo.nickname}
//   onChange={handleChangeSignUpInfo}
// />
// <Input
//   type="text"
//   placeholder="email"
//   name="email"
//   value={signUpInfo.email}
//   onChange={handleChangeSignUpInfo}
// />
// <Input
//   type="password"
//   placeholder="password"
//   name="password"
//   value={signUpInfo.password}
//   onChange={handleChangeSignUpInfo}
// />
// <Input
//   type="password"
//   placeholder="passwordConfirm"
//   name="passwordConfirm"
//   value={signUpInfo.passwordConfirm}
//   onChange={handleChangeSignUpInfo}
// />
// <Input
//   type="age"
//   placeholder="age"
//   name="age"
//   value={signUpInfo.age}
//   onChange={handleChangeSignUpInfo}
// />
// <button onClick={handleSignUpClick}>회원가입</button>
// </div>