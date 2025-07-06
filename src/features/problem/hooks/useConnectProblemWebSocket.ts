'use client';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/env';
import { sharedStompRef } from '@/shared/lib/stomp/sharedStompRef';
import { useEffect } from 'react';
import useAccessToken from '@/entities/auth/hooks/useAuthToken';

export default function useConnectProblemWebSocket() {
  const accessToken = useAccessToken();
  const problemStompRef = sharedStompRef;

  useEffect(() => {
    if (problemStompRef.current || !accessToken) {
      console.log('already problem stomp connected');
      return;
    }
    if (!accessToken) return;

    const socket = new SockJS(`${BASE_URL}/ws?token=${encodeURIComponent(accessToken)}`);
    const client = new Client({ webSocketFactory: () => socket, reconnectDelay: 5000 });

    problemStompRef.current = client;
    client.activate();
    // cleanup
    return () => {
      client.deactivate();
    };
  }, [accessToken, problemStompRef]);
  return { problemStompRef };
}
