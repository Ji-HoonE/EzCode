import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'EZ-Code - 로그인',
    description: 'EZ-Code 로그인 및 회원가입',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function GuestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-full bg-gradient-to-r from-[#6E00AA] to-[#2C0044] pt-[256px] pb-[198px] pl-[181px] pr-[231px]">
            {children}
        </main>
    );
} 