'use client';

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/env';
import { useEffect, useRef } from 'react';
import { useProblemWebSocketStoreActions } from '../model/useProblemWebSocketStore';
import Cookies from 'js-cookie';
export default function useConnectProblemWebSocket() {
  const problemStompRef = useRef<Client | null>(null);

  const { clearStore, setIsConnected } = useProblemWebSocketStoreActions();
  const accessToken = Cookies.get('accessToken');

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
        setIsConnected(true);
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
