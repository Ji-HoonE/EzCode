'use client';
import useLogin from '../hooks/useLogin';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import UnifiedInput from '@/shared/ui/InputFiled';
import { useZodForm } from '@/shared/lib/zod/useZodForm';
import { SIGNIN_ZOD_SCHEMA } from '@/entities/auth/model/authZodSchemas';
import { FormProvider } from 'react-hook-form';
interface SignInFormProps {
  onLoginSuccess?: () => void;
}
const SignInForm = ({ onLoginSuccess }: SignInFormProps) => {
  const router = useRouter();
  const { handleSignInClick, handlePasswordVisible, isPasswordVisible, requestError } =
    useLogin(onLoginSuccess);

  const methods = useZodForm(SIGNIN_ZOD_SCHEMA, ['email', 'password']);

  const handleSubmit = methods.handleSubmit((data) => {
    handleSignInClick(data);
  });

  return (
    <FormProvider {...methods}>
      <div className="space-y-5">
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
          type={isPasswordVisible ? 'text' : 'password'}
          leftSlot={<Lock className="text-gray-500" size={18} />}
          rightSlot={
            <button
              type="button"
              onClick={handlePasswordVisible}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
        />
        <div className="flex items-center justify-between text-sm">
          {/* <label className="flex items-center text-gray-400">
          <input type="checkbox" className="mr-2 rounded" />
          로그인 상태 유지
        </label> */}
          <button
            type="button"
            className="text-[#00d084] hover:underline"
            onClick={() => router.push('/find/password')}
          >
            비밀번호 찾기
          </button>
        </div>
        {requestError && <p className="text-red-500 text-sm">{requestError}</p>}
        <button
          type="button"
          className="w-full bg-[#214d35] text-white py-3 rounded-[10px] font-medium hover:bg-[#276e48] active:bg-[#1e3e2c] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={handleSubmit}
        >
          로그인
        </button>
      </div>
    </FormProvider>
  );
};

export default SignInForm;
