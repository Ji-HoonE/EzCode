import { AdminSidebar } from './admin/_ui/AdminSideBar';
import './admin.css';
import QueryProvider from '@/lib/QueryProvider';

export default async function AdminLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="ko">
        <body className="flex justify-center w-full h-full">
          <div className="flex h-screen bg-background w-full">
            <AdminSidebar />
            <main className="flex-1 overflow-auto">
              <div className="p-6">{children}</div>
            </main>
          </div>
          {modal}
        </body>
      </html>
    </QueryProvider>
  );
}
