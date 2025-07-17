'use client';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/env';
import { useEffect } from 'react';
import useAccessToken from '@/shared/hooks/useAuthToken';
import { sharedStompRef } from '@/shared/lib/stomp/sharedStompRef';

export default function useConnectChatWebSocket() {
  const accessToken = useAccessToken();
  const chatStompRef = sharedStompRef;

  useEffect(() => {
    if (!accessToken) {
      console.log('No token, skipping WebSocket connection');
      return;
    }

    if (chatStompRef.current) {
      console.log('Already stomp connected');
      return;
    }

    const socket = new SockJS(`${BASE_URL}/ws?chat-token=${encodeURIComponent(accessToken)}`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('stomp Connected!!');
      },
    });
    chatStompRef.current = client;
    client.activate();

    return () => {
      console.log('Cleaning up Chat STOMP client');
      client.deactivate();
      chatStompRef.current = null;
    };
  }, [accessToken]);

  return { chatStompRef };
}
