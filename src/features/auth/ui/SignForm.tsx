'use client';
import { Suspense, useState } from 'react';
import SignupForm from './SignupForm';
import SignInSocialLogin from './SignInSocialLogin';
import SignInForm from './SigninForm';

type activeTabType = 'login' | 'signup';

const SignForm = () => {
  const [activeTab, setActiveTab] = useState<activeTabType>('login');
  return (
    <div className="w-full flex items-center justify-start p-4 lg:p-8">
      <div className="w-full max-w-[600px]">
        <div className="border border-gray-700 rounded-[10px] shadow-2xl lg:bg-gray-600/30 lg:backdrop-blur-sm">
          <div className="p-6">
            <div className="flex mb-8 bg-gray-800/50 rounded-[12px] p-1.5">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-3 px-6 rounded-[10px] text-sm font-medium transition-all duration-200 ${
                  activeTab === 'login'
                    ? 'bg-[#214d35] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                로그인
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-3 px-6 rounded-[10px] text-sm font-medium transition-all duration-200 ${
                  activeTab === 'signup'
                    ? 'bg-[#214d35] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                회원가입
              </button>
            </div>
            {activeTab === 'login' && <SignInForm />}
            {activeTab === 'signup' && <SignupForm />}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-center text-gray-400 text-sm mb-4">또는</p>
              <Suspense fallback={<></>}>
                <SignInSocialLogin />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignForm;
