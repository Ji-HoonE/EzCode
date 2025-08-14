import NavigationBar from '@/widgets/NavigationBar/ui';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center w-full h-full">
        <QueryProvider>
          <div className="w-full h-full">
            <NavigationBar />
            <div className="w-full h-[calc(100vh-72px)] px-15">{children}</div>
          </div>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
