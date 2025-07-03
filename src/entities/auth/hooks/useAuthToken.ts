'use client';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

/* 토큰 불러오기, 웹소켓시 필요합니다. */
export default function useAccessToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      if (session?.accessToken) {
        setToken(session.accessToken as string);
      }
    };
    fetchToken();
  }, []);
  if (token) {
    const formattedToken = token?.split(' ');
    return formattedToken[1];
  }
  return null;
}
