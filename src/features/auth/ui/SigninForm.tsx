'use client';
import useLogin from '../hooks/useLogin';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
interface SignInFormProps {
  onLoginSuccess?: () => void;
}
const SignInForm = ({ onLoginSuccess }: SignInFormProps) => {
  const router = useRouter();
  const {
    loginInfo,
    handleChangeLoginInfo,
    handleSignInClick,
    handlePasswordVisible,
    isPasswordVisible,
    errorMessage,
  } = useLogin(onLoginSuccess);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            id="email"
            name="email"
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
            value={loginInfo.email}
            onChange={handleChangeLoginInfo}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">비밀번호</label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={handleChangeLoginInfo}
          />
          <button
            type="button"
            onClick={handlePasswordVisible}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div></div>
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
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <button
        type="submit"
        className="w-full bg-[#214d35] text-white py-3 rounded-[10px] font-medium hover:bg-[#276e48] active:bg-[#1e3e2c] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
        onClick={handleSignInClick}
      >
        로그인
      </button>
    </div>
  );
};

export default SignInForm;
