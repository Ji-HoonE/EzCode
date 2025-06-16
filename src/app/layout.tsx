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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-100dvh w-100dvw bg-black flex justify-center items-center">
        {children}
      </body>
    </html>
  );
}
