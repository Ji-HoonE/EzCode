import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EZ-Code',
  description: '임시 description',
  icons: {
    icon: '/favicon.ico',
  },
};
export default function RootLayout({
  children,
  chatDialog,
}: Readonly<{
  children: React.ReactNode;
  chatDialog: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex justify-center">
        {chatDialog}
        {children}
      </body>
    </html>
  );
}
