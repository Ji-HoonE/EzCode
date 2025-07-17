'use client';
import { cn } from "@/lib/utils";
import useResetPassword from "../hooks/useResetPassword";
import Image from "next/image";



const ResetPasswordForm = () => {
    const { handleChangeNewPassword, resetPasswordInfo, handleResetPasswordClick, isNewPasswordVisible, isNewPasswordConfirmVisible, handleNewPasswordVisible, handleNewPasswordConfirmVisible, errorMessage } = useResetPassword();
    return (
        <div className="flex flex-col w-full h-full pt-[150px] justify-between items-center">
            <div className="flex flex-col w-[679px]">
                <p className="text-[27px] font-[500]">새로운 비밀번호를 입력해주세요.</p>
                <div className="w-[679px] h-full flex flex-col justify-center border-b-[1px] border-[#fff] pb-[30px] mt-[100px]">
                    <p className="text-[27px] font-[600]">비밀번호 변경</p>
                </div>
                <div className='flex flex-col gap-[6px] mt-[66px] w-full'>
                    <div className='flex items-center justify-center h-[37px] gap-[39px] pl-[15px] pr-[45px] relative'>
                        <p className="text-[13px] font-[400] w-[130px] text-[#EBEBEB]">새로운 비밀번호</p>
                        <div className="flex relative w-full h-full">
                            <Image src="/icons/lock.svg" alt="lock" width={16} height={16} priority className='absolute left-[11px] top-[9px]' />
                            <input
                                type={isNewPasswordVisible ? 'text' : 'password'}
                                data-slot="input"
                                className={cn(
                                    "bg-[#FFFFFFF6] text-black w-full h-full border-[1px] border-[#DEDEDE] rounded-[7px] border-none",
                                    "pl-[35px] pr-[35px]",
                                    "shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]"
                                )}
                                placeholder="새로운 비밀번호를 확인해주세요"
                                id="newPassword"
                                name="newPassword"
                                value={resetPasswordInfo.newPassword}
                                onChange={handleChangeNewPassword}
                            />
                            <Image src="/icons/eyeOff.svg" alt="eyeOff" width={16} height={16} priority className='absolute right-[10px] top-[9px]' onClick={handleNewPasswordVisible} />
                        </div>
                    </div>
                    <div className='flex items-center justify-center h-[37px] gap-[39px] pl-[15px] pr-[45px]'>
                        <p className="text-[13px] font-[400] w-[130px] text-[#EBEBEB]">비밀번호 재확인</p>
                        <div className="flex relative w-full h-full">
                            <Image src="/icons/lock.svg" alt="lock" width={16} height={16} priority className='absolute left-[11px] top-[9px]' />
                            <input
                                type={isNewPasswordConfirmVisible ? 'text' : 'password'}
                                data-slot="input"
                                className={cn(
                                    "bg-[#FFFFFFF6] text-black w-full h-full border-[1px] border-[#DEDEDE] rounded-[7px]",
                                    "h-full pl-[35px] pr-[35px]",
                                    "shadow-[inset_0_2px_2px_0_rgba(0,0,0,0.25)] text-[14px]"
                                )}
                                value={resetPasswordInfo.newPasswordConfirm}
                                placeholder="새로운 비밀번호를 확인해주세요"
                                id="newPasswordConfirm"
                                name="newPasswordConfirm"
                                onChange={handleChangeNewPassword}
                            />
                            <Image src="/icons/eyeOff.svg" alt="eyeOff" width={16} height={16} priority className='absolute right-[10px] top-[9px]' onClick={handleNewPasswordConfirmVisible} />

                        </div>
                    </div>
                    <div className='flex pl-[15px] pr-[45px] mt-[20px]'>
                        {errorMessage && <div className='flex items-center gap-[4px]'><Image src="/icons/alert.svg" alt="error" width={10} height={10} priority className='mb-[2px]' /><span className='text-[12px] font-[700] text-[#EC3030]'>{errorMessage}</span></div>}
                    </div>
                    <div className='flex w-full mt-[30px] pl-[15px] pr-[45px]'>
                        <button className='w-full h-[37px] border-[1px] border-[#DEDEDE] rounded-[7px] bg-[#969696] text-white text-[15px] font-[800]' onClick={handleResetPasswordClick}>비밀번호 변경</button>
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
}

export default ResetPasswordForm;