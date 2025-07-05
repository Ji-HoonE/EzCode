import { SigninForm } from '@/features/auth';
import Image from 'next/image';

export default function SigninPage() {
  return (
    <div className='w-full h-full px-[51px] py-[29px] flex flex-col justify-center relative bg-gradient'>
      <Image src="/logo/EZMainLogo.svg" alt="EZ-MainLogo" width={140} height={140} priority className='absolute top-[29px] left-[51px]' />

      <div className='flex justify-center gap-[47px] items-center'>
        <div className='flex flex-col justify-center mb-[90px]'>
          <p className='text-[48px] font-[500] text-white text-end leading-[70px]'>어서오세요, <br />당신의 코딩을 돕는</p>
          <p className='text-[48px] font-[500] text-white text-end leading-[70px] mt-[20px]'>
            <span className='text-[#00B84A] text-[80px] font-[700] leading-[70px]'>EzCode</span>
            <br />
            입니다.
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='w-[584px] h-[679px] border-[5px] border-white/75 rounded-[31px] p-[17px]'>
            <SigninForm />
          </div>
          <div className='w-full flex justify-center items-center gap-[47px] mt-[13px]'>
            <p className='text-[20px] font-[400] text-[#FFFFFF] leading-[50px]'>이용약관</p>
            <p className='text-[20px] font-[400] text-[#FFFFFF] leading-[50px]'>개인정보 처리방침</p>
            <p className='text-[20px] font-[400] text-[#FFFFFF] leading-[50px] underline underline-offset-[3px]'>FAQ/문의</p>
          </div>
        </div>
      </div>
    </div >
  );
}