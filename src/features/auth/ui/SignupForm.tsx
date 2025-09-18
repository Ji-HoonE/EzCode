'use client';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import useSignUp from '../hooks/useSignUp';
import { FormProvider } from 'react-hook-form';
import { useZodForm } from '@/shared/lib/zod/useZodForm';
import { SIGNUP_ZOD_SCHEMA } from '@/entities/auth/model/authZodSchemas';
import UnifiedInput from '@/shared/ui/InputFiled';
const SignupForm = () => {
  const {
    handleSignUpClick,
    handlePasswordVisible,
    handlePasswordConfirmVisible,
    showPassword,
    showPasswordConfirm,
    // errorMessage,
  } = useSignUp();

  const methods = useZodForm(SIGNUP_ZOD_SCHEMA, ['name', 'email', 'password', 'passwordCheck']);

  const handleSubmit = methods.handleSubmit((data) => {
    handleSignUpClick(data);
  });

  return (
    <FormProvider {...methods}>
      <div className="space-y-5">
        <UnifiedInput
          label="이름"
          inputType="input"
          name="name"
          leftSlot={<User className="text-gray-500" size={18} />}
        />

        <UnifiedInput
          label="이메일"
          inputType="input"
          name="email"
          type="email"
          leftSlot={<Mail className="text-gray-500" size={18} />}
        />
        <UnifiedInput
          label="비밀번호"
          inputType="input"
          name="password"
          type={showPassword ? 'text' : 'password'}
          leftSlot={<Lock className="text-gray-500" size={18} />}
          rightSlot={
            <button
              type="button"
              onClick={handlePasswordVisible}
              className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <UnifiedInput
          label="비밀번호 확인"
          inputType="input"
          name="passwordCheck"
          type={showPasswordConfirm ? 'text' : 'password'}
          leftSlot={<Lock className="text-gray-500" size={18} />}
          rightSlot={
            <button
              type="button"
              onClick={handlePasswordConfirmVisible}
              className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
            >
              {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />

        {/* //TODO 약관 및 개인정보 처리방침 추후 추가 */}
        {/* <div className="text-sm">
        <label className="flex items-start text-gray-400">
          <input type="checkbox" className="mr-2 mt-1 rounded" />
          <span>
            <span className="text-[#00d084]">이용약관</span> 및{' '}
            <span className="text-[#00d084]">개인정보처리방침</span>에 동의합니다.
          </span>
        </label>
      </div> */}
        {/* {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>} */}
        <button
          type="button"
          className="w-full bg-[#214d35] text-white py-3 rounded-[10px] font-medium hover:bg-[#276e48] active:bg-[#1e3e2c] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={handleSubmit}
        >
          회원가입
        </button>
      </div>
    </FormProvider>
  );
};

export default SignupForm;
