'use client';
import { useFindInfo } from "@/features/auth/hooks/useFindInfo";
import { cn } from "@/lib/utils";
import Image from "next/image";


const FindPasswordForm = () => {
    const { findEmail, handleFindPasswordClick, handleChangeFindPassword, errorMessage, successMessage } = useFindInfo();
    return (
        <div className="flex flex-col w-full h-full items-center pt-[150px] justify-between">
            <div className="flex flex-col items-center gap-[63px]">
                <div>
                    <p className="text-[32px] font-[500]">비밀번호를 잊으셨나요?</p>
                    <p className="text-[22px] font-[500]">이메일을 인증하고 비밀번호를 변경하세요.</p>
                </div>
                <div className='border-[5px] border-white/75 rounded-[31px] p-[17px] w-[391px] h-[260px]'>
                    <div className="w-full h-full flex flex-col items-center bg-[#FFFFFFF6] rounded-[10px] py-[34px] px-[33px]">
                        <p className='text-[20px] font-[800] text-black'>이메일 인증</p>
                        <div className="flex justify-start w-full">
                            <p className='text-[15px] font-[500] text-black'>이메일</p>
                        </div>
                        <div className='flex flex-col w-full gap-[6px]'>
                            <div className='bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] relative'>
                                <Image src="/icons/mailBlack.svg" alt="mail" width={16} height={16} priority className='absolute left-[11px] top-[9px]' />
                                <input
                                    type={'text'}
                                    data-slot="input"
                                    className={cn(
                                        "bg-[#FFFFFFF6] text-black h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] w-full border-none",
                                        "h-full pl-[35px] pr-[35px]",
                                        "shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]"
                                    )}
                                    placeholder="이메일을 입력해주세요"
                                    id="findEmail"
                                    name="findEmail"
                                    value={findEmail}
                                    onChange={handleChangeFindPassword}
                                />
                            </div>
                            {errorMessage && <div className='flex items-center gap-[4px]'><Image src="/icons/alert.svg" alt="error" width={10} height={10} priority className='mb-[2px]' /><span className='text-[12px] font-[700] text-[#EC3030]'>{errorMessage}</span></div>}
                            {successMessage && <div className='flex items-center gap-[4px]'><span className='text-[10px] font-[700] text-[#00E35B]'>{successMessage}</span></div>}
                            <button className='h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] bg-[#969696] text-white text-[15px] font-[800]' onClick={handleFindPasswordClick}>인증 메일 보내기</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-center items-center gap-[47px]'>
                <p className='text-[13px] font-[400] text-[#FFFFFF] leading-[33px]'>이용약관</p>
                <p className='text-[13px] font-[400] text-[#FFFFFF] leading-[33px]'>개인정보 처리방침</p>
                <p className='text-[13px] font-[400] text-[#FFFFFF] leading-[33px] underline underline-offset-[2px]'>FAQ/문의</p>
            </div>
        </div >
    )
};

export default FindPasswordForm;