import AuthProvider from '@/lib/AuthProvider';
import { GlobalFloatingWidget } from '@/widgets/globalFloatingWidget/ui';

export default function RootLayout({
  children,
  chatDialog,
}: Readonly<{
  children: React.ReactNode;
  chatDialog: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="w-full h-full">
        {chatDialog}
        <div className="w-full h-full">{children}</div>
        <GlobalFloatingWidget />
      </div>
    </AuthProvider>
  );
}
