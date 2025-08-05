'use client';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/env';
import { sharedStompRef } from '@/shared/lib/stomp/sharedStompRef';
import { useEffect } from 'react';
import useProblemWebSocketStore, {
  useProblemWebSocketStoreActions,
} from '../model/useProblemWebSocketStore';

export default function useConnectProblemWebSocket() {
  const problemStompRef = sharedStompRef;

  const { clearStore, setStatus } = useProblemWebSocketStoreActions();
  const { token: accessToken } = useProblemWebSocketStore();

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
        setStatus('isConnected', true);
      },
    });

    problemStompRef.current = client;
    client.activate();

    return () => {
      console.log('Cleaning up STOMP client');
      client.deactivate();
      problemStompRef.current = null;
      clearStore();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, clearStore]);

  return { problemStompRef };
}
