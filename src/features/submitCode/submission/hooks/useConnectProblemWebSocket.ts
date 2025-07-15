'use client';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/env';
import { sharedStompRef } from '@/shared/lib/stomp/sharedStompRef';
import { useEffect } from 'react';
import useAccessToken from '@/entities/auth/hooks/useAuthToken';
import { useProblemWebSocketStoreActions } from '../model/useProblemWebSocketStore';

export default function useConnectProblemWebSocket() {
  const accessToken = useAccessToken();
  const problemStompRef = sharedStompRef;
  const { clearMessages } = useProblemWebSocketStoreActions();
  const { setStatus } = useProblemWebSocketStoreActions();
  useEffect(() => {
    if (!accessToken) {
      console.log('No token, skipping WebSocket connection');
      return;
    }

    if (problemStompRef.current) {
      console.log('Already stomp connected');
      return;
    }

    const socket = new SockJS(`${BASE_URL}/ws?token=${encodeURIComponent(accessToken)}`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        setStatus(true);
      },
    });

    problemStompRef.current = client;
    client.activate();

    return () => {
      console.log('Cleaning up STOMP client');
      client.deactivate();
      problemStompRef.current = null;
      setStatus(false);
      clearMessages();
    };
  }, [accessToken, clearMessages]);

  return { problemStompRef };
}
