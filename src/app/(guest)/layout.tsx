import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EZ-CODE - 로그인',
  description: 'EZ-CODE 로그인 및 회원가입',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full h-[calc(100vh-75px)] flex">
      <div className="w-full h-full px-[51px] flex flex-col justify-center relative ">
        {children}
      </div>
    </main>
  );
}
