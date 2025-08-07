import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EZ-Code - 로그인',
  description: 'EZ-Code 로그인 및 회원가입',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-[calc(100vh-75px)] flex">
      <div className="w-full h-full px-[51px] flex flex-col justify-center relative bg-[linear-gradient(90deg,rgba(14,30,3,1)_0%,rgba(13,12,22,1)_50%,rgba(6,34,19,1)_100%)]">
        {children}
      </div>
    </main>
  );
}
