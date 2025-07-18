import AuthProvider from '@/lib/AuthProvider';
import { NavigationBar } from '@/widgets/navigation-bar';

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
        <NavigationBar />
        {chatDialog}
        <div className="w-full h-full ">{children}</div>
      </div>
    </AuthProvider>
  );
}
