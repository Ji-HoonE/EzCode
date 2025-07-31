'use client';
import useResetPassword from '../hooks/useResetPassword';
import { Lock } from 'lucide-react';
const ResetPasswordForm = () => {
  const {
    handleChangeNewPassword,
    resetPasswordInfo,
    handleResetPasswordClick,
    isNewPasswordVisible,
    isNewPasswordConfirmVisible,
    handleNewPasswordVisible,
    handleNewPasswordConfirmVisible,
    errorMessage,
  } = useResetPassword();
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex relative overflow-hidden flex justify-center w-full">
        <div className="flex flex-col justify-center px-12 py-16 relative z-10">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-6">
              비밀번호를
              <br />
              <span className="text-[#00d084]">재설정</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              새로운 비밀번호를 입력해주세요
            </p>
          </div>
        </div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300d084' fillOpacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-start p-4 lg:p-8">
        <div className="w-full max-w-[600px]">
          <div className="border border-gray-700 rounded-[10px] shadow-2xl lg:bg-gray-600/30 lg:backdrop-blur-sm">
            <div className="p-6">
              <div className="space-y-5 min-h-[150px]">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    새로운 비밀번호
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                      onClick={handleNewPasswordVisible}
                    />
                    <input
                      type={isNewPasswordVisible ? 'text' : 'password'}
                      placeholder="새로운 비밀번호를 확인해주세요"
                      id="newPassword"
                      name="newPassword"
                      value={resetPasswordInfo.newPassword}
                      onChange={handleChangeNewPassword}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    비밀번호 재확인
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      size={18}
                      onClick={handleNewPasswordConfirmVisible}
                    />
                    <input
                      type={isNewPasswordConfirmVisible ? 'text' : 'password'}
                      placeholder="새로운 비밀번호를 확인해주세요"
                      id="newPasswordConfirm"
                      name="newPasswordConfirm"
                      onChange={handleChangeNewPassword}
                      value={resetPasswordInfo.newPasswordConfirm}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-[10px] text-white placeholder-gray-500 focus:outline-none focus:border-[#00d084] focus:ring-1 focus:ring-[#00d084] transition-all duration-200"
                    />
                  </div>
                </div>
                {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
                <button
                  className="w-full bg-[#214d35] text-white py-3 rounded-[10px] font-medium hover:bg-[#276e48] active:bg-[#1e3e2c] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={handleResetPasswordClick}
                >
                  비밀번호 변경
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
