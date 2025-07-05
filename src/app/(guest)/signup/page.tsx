
import { SignupForm } from '@/features/auth';

export default function SignupPage() {
  return (
    <div className='flex justify-center gap-[31px] items-center'>
      <div className='flex flex-col justify-center mb-[60px]'>
        <p className='text-[32px] font-[500] text-white text-end leading-[47px]'>어서오세요, <br />당신의 코딩을 돕는</p>
        <p className='text-[32px] font-[500] text-white text-end leading-[47px] mt-[13px]'>
          <span className='text-[#00B84A] text-[54px] font-[700] leading-[47px]'>EzCode</span>
          <br />
          입니다.
        </p>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='w-[391px] h-[540px] border-[3px] border-white/75 rounded-[21px] p-[11px]'>
          <SignupForm />
        </div>
        <div className='w-full flex justify-center items-center gap-[47px] mt-[13px]'>
          <p className='text-[13px] font-[400] text-[#FFFFFF] leading-[33px]'>이용약관</p>
          <p className='text-[13px] font-[400] text-[#FFFFFF] leading-[33px]'>개인정보 처리방침</p>
          <p className='text-[13px] font-[400] text-[#FFFFFF] leading-[33px] underline underline-offset-[2px]'>FAQ/문의</p>
        </div>
      </div>
    </div>
  );
}
