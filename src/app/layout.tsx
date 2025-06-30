import { Toaster } from 'sonner';
import './globals.css';
import QueryProvider from '@/query/QueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center">
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
