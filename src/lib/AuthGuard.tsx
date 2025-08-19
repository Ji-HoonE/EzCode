'use client';

import RequireLoginDialog from '@/shared/ui/LoginRequiredUi/RequireLoginDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const PROTECTED_PATHS = ['/rank', '/notifications'];

export default function AuthGuard() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { status, data: session, update } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
    if (status === 'loading') {
      return;
    }
    if (isProtectedPath && status === 'unauthenticated') {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [status, pathname, session]);

  const handleCloseLoginModal = () => {
    router.back();
    setTimeout(() => {
      setShowLoginModal(false);
    }, 50);
  };

  const handleLoginSuccess = async () => {
    setShowLoginModal(false);
    queryClient.invalidateQueries();
    await update();
  };

  return (
    <RequireLoginDialog
      isOpen={showLoginModal}
      onClose={handleCloseLoginModal}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}
