import AuthProvider from '@/lib/AuthProvider';

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
      </div>
    </AuthProvider>
  );
}
