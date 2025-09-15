import AuthGuard from '@/lib/AuthGuard';
import { GlobalFloatingWidget } from '@/widgets/globalFloatingWidget/ui';

export default async function NavigationBarLayout({
  children,
  chatDialog,
}: Readonly<{
  children: React.ReactNode;
  chatDialog: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      {chatDialog}
      <div className="w-full h-full">{children}</div>
      <GlobalFloatingWidget />
      <AuthGuard />
    </div>
  );
}
