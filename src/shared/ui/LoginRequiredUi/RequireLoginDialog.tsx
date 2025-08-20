'use client';

import SignInForm from '@/features/auth/ui/SigninForm';
import SignInSocialLogin from '@/features/auth/ui/SignInSocialLogin';
import { Suspense } from 'react';

interface IRequireLoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}
export default function RequireLoginDialog({
  isOpen,
  onClose,
  onLoginSuccess,
}: IRequireLoginDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[600px] relative">
          <div className="border border-[#214d35] rounded-[10px] shadow-2xl bg-[#0c151c]">
            <div className="p-6">
              <div className="flex mb-8 rounded-[12px] p-1.5">로그인</div>
              <SignInForm onLoginSuccess={onLoginSuccess} />
              <div className="mt-6 pt-6 border-t border-[#214d35]">
                <p className="text-center text-gray-400 text-sm mb-4">또는</p>
                <Suspense fallback={<></>}>
                  <SignInSocialLogin onLoginSuccess={onClose} />
                </Suspense>
              </div>
            </div>
          </div>
          {/* X 버튼 */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 bg-[#214d35] hover:bg-[#1a2332] rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
