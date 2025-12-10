'use client';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/env';
import { useEffect, useRef } from 'react';
import { useChatWebSocketActions } from '../../model/useChatWebSocketStore';
import cookies from 'js-cookie';

export default function useConnectChatWebSocket() {
  const accessToken = cookies.get('accessToken');
  const chatStompRef = useRef<Client | null>(null);
  const { setIsConnected } = useChatWebSocketActions();

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
        setIsConnected(true);
      },
    });
    chatStompRef.current = client;
    client.activate();

    return () => {
      console.log('Cleaning up Chat STOMP client');
      client.deactivate();
      chatStompRef.current = null;
      setIsConnected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return { chatStompRef };
}
