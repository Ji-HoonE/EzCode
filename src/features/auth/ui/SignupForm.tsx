'use client';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import useSignUp from '../hooks/useSignUp';
const SignupForm = () => {
  const {
    signUpInfo,
    handleChangeSignUpInfo,
    handleSignUpClick,
    handlePasswordVisible,
    handlePasswordConfirmVisible,
    showPassword,
    showPasswordConfirm,
    errorMessage,
  } = useSignUp();
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
        <div className="relative">
          <User
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            id="name"
            name="username"
            type="text"
            value={signUpInfo.username}
            onChange={handleChangeSignUpInfo}
            placeholder="이름을 입력하세요"
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">이메일</label>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            id="email"
            name="email"
            type="email"
            value={signUpInfo.email}
            onChange={handleChangeSignUpInfo}
            placeholder="이메일을 입력하세요"
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
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
            id="password"
            name="password"
            value={signUpInfo.password}
            onChange={handleChangeSignUpInfo}
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력하세요"
            className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
          />
          <button
            type="button"
            onClick={handlePasswordVisible}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">비밀번호 확인</label>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            value={signUpInfo.passwordConfirm}
            onChange={handleChangeSignUpInfo}
            type={showPasswordConfirm ? 'text' : 'password'}
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full pl-10 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
          />
          <button
            type="button"
            onClick={handlePasswordConfirmVisible}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
          >
            {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
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
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <button
        type="submit"
        className="w-full bg-[#214d35] text-white py-3 rounded-[10px] font-medium hover:bg-[#276e48] active:bg-[#1e3e2c] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
        onClick={handleSignUpClick}
      >
        회원가입
      </button>
    </div>
  );
};

export default SignupForm;
