import type { Metadata } from 'next';
import Image from 'next/image';

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
        <main className="w-full h-full flex">
            <div className='w-full h-full px-[51px] py-[29px] flex flex-col justify-center relative bg-gradient'>
                <Image src="/logo/EZMainLogo.svg" alt="EZ-MainLogo" width={94} height={94} priority className='absolute top-[29px] left-[51px]' />
                {children}
            </div>
        </main>
    );
} 