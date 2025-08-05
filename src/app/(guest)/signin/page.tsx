import SignForm from '@/features/auth/ui/SignForm';
import { Code, Users, Trophy, BookOpen } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex relative overflow-hidden flex justify-center w-full">
        <div className="flex flex-col justify-center px-12 py-16 relative z-10">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-white mb-6">
              코딩테스트
              <br />
              <span className="text-[#00d084]">커뮤니티</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              개발자들과 함께 성장하는 코딩테스트 준비 플랫폼
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#214d35] rounded-[10px] flex items-center justify-center">
                  <Code className="text-[#00d084]" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">문제 공유</h3>
                  <p className="text-gray-500 text-sm">다양한 알고리즘 문제를 공유하고 토론해요</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#214d35] rounded-[10px] flex items-center justify-center">
                  <Users className="text-[#00d084]" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">스터디 그룹</h3>
                  <p className="text-gray-500 text-sm">함께 공부할 동료들을 찾아보세요</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#214d35] rounded-[10px] flex items-center justify-center">
                  <Trophy className="text-[#00d084]" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">경험 공유</h3>
                  <p className="text-gray-500 text-sm">실제 면접 경험과 합격 후기를 나누어요</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#214d35] rounded-[10px] flex items-center justify-center">
                  <BookOpen className="text-[#00d084]" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">학습 자료</h3>
                  <p className="text-gray-500 text-sm">검증된 학습 자료와 팁을 제공합니다</p>
                </div>
              </div>
            </div>
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
      <SignForm />
    </div>
  );
}
