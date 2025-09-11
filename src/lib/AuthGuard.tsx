// 'use client';

// import RequireLoginDialog from '@/shared/ui/LoginRequiredUi/RequireLoginDialog';
// import { useQueryClient } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';
// import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// const PROTECTED_PATHS = ['/rank', '/notifications'];

// export default function AuthGuard() {
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();
//   const { status, data: session, update } = useSession();
//   const queryClient = useQueryClient();

//   const searchParams = useSearchParams();
//   const hasAuthGuardTrigger = searchParams.get('auth-guard');

//   useEffect(() => {
//     const isProtectedPath =
//       PROTECTED_PATHS.some((path) => pathname.startsWith(path)) || hasAuthGuardTrigger;
//     if (status === 'loading') {
//       return;
//     }
//     if (isProtectedPath && status === 'unauthenticated') {
//       setShowLoginModal(true);
//     } else {
//       setShowLoginModal(false);
//     }
//   }, [status, pathname, session, searchParams, hasAuthGuardTrigger]);

//   const handleCloseLoginModal = () => {
//     router.back();
//     setTimeout(() => {
//       setShowLoginModal(false);
//     }, 50);
//   };

//   const handleLoginSuccess = async () => {
//     if (hasAuthGuardTrigger) {
//       const params = new URLSearchParams(searchParams.toString());
//       params.delete('auth-guard');
//       router.replace(`?${params.toString()}`);
//     }

//     setShowLoginModal(false);
//     queryClient.invalidateQueries();
//     await update();
//   };

//   return (
//     <RequireLoginDialog
//       isOpen={showLoginModal}
//       onClose={handleCloseLoginModal}
//       onLoginSuccess={handleLoginSuccess}
//     />
//   );
// }
'use client';

import RequireLoginDialog from '@/shared/ui/LoginRequiredUi/RequireLoginDialog';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const PROTECTED_PATHS = ['/rank', '/notifications'];

export default function AuthGuard() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const hasAuthGuardTrigger = searchParams.get('auth-guard');

  useEffect(() => {
    const isProtectedPath =
      PROTECTED_PATHS.some((path) => pathname.startsWith(path)) || hasAuthGuardTrigger;

    // js-cookie 기준으로 로그인 상태 체크
    const accessToken = Cookies.get('accessToken');
    const isAuthenticated = !!accessToken;

    if (isProtectedPath && !isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [pathname, searchParams, hasAuthGuardTrigger]);

  const handleCloseLoginModal = () => {
    router.back();
    setTimeout(() => {
      setShowLoginModal(false);
    }, 50);
  };

  const handleLoginSuccess = () => {
    if (hasAuthGuardTrigger) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('auth-guard');
      router.replace(`?${params.toString()}`);
    }

    setShowLoginModal(false);
    queryClient.invalidateQueries();
  };

  return (
    <RequireLoginDialog
      isOpen={showLoginModal}
      onClose={handleCloseLoginModal}
      onLoginSuccess={handleLoginSuccess}
    />
  );
}
