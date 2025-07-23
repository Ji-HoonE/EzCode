import NavigationBar from '@/widgets/NavigationBar';
import './globals.css';
import QueryProvider from '@/lib/QueryProvider';

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
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
