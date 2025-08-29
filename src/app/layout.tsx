import NavigationBar from '@/widgets/NavigationBar/ui';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';
import { Toaster } from 'sonner';
import AuthProvider from '@/lib/AuthProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EZ-CODE - 코딩 테스트',
  description: 'EZ-CODE 코딩 테스트 플랫폼',
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ko">
      <body className="flex justify-center w-full h-full">
        <QueryProvider>
          <AuthProvider session={session}>
            <div className="w-full h-full">
              <NavigationBar />
              <div className="w-full h-[calc(100vh-72px)] px-15">{children}</div>
            </div>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
