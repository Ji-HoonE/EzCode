import AuthProvider from '@/lib/AuthProvider';
import { NavigationBar } from '@/widgets/navigation-bar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="w-full h-100dvh">
        <NavigationBar />
        <div className="w-full h-full">{children}</div>
      </div>
    </AuthProvider>
  );
}
