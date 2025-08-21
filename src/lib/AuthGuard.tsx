'use client';

import RequireLoginDialog from '@/shared/ui/LoginRequiredUi/RequireLoginDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
const PROTECTED_PATHS = ['/rank', '/notifications'];

export default function AuthGuard() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { status, data: session, update } = useSession();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const hasAuthGuardTrigger = searchParams.get('auth-guard');

  useEffect(() => {
    const isProtectedPath =
      PROTECTED_PATHS.some((path) => pathname.startsWith(path)) || hasAuthGuardTrigger;
    if (status === 'loading') {
      return;
    }
    if (isProtectedPath && status === 'unauthenticated') {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [status, pathname, session, searchParams]);

  const handleCloseLoginModal = () => {
    router.back();
    setTimeout(() => {
      setShowLoginModal(false);
    }, 50);
  };

  const handleLoginSuccess = async () => {
    if (hasAuthGuardTrigger) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('auth-guard');
      router.replace(`?${params.toString()}`);
    }

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
