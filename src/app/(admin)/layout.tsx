'use client';

import { AdminSidebar } from './admin/_ui/AdminSideBar';
import './admin.css';
import { useEffect } from 'react';
import { useMyInfoQuery } from '@/entities/mypage/model/query';
import { useRouter } from 'next/navigation';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { data: userInfo, isError, error, isLoading } = useMyInfoQuery();

  useEffect(() => {
    if (isLoading) return;
    if (isError || error || !userInfo) {
      router.back();
      return;
    }
    if (userInfo?.data?.result?.userRole !== 'ADMIN') {
      router.back();
    }
  }, [userInfo, isError, error, isLoading, router]);

  if (isLoading || isError || error || !userInfo || userInfo?.data?.result?.userRole !== 'ADMIN') {
    return null;
  }
  return (
    <div className="flex h-screen bg-background w-full">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
