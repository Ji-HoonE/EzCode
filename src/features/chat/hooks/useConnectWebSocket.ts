'use client';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { sharedStompRef } from '../store/stompClientStore';
import { BASE_URL } from '@/constants/env';
import { useEffect, useState } from 'react';

export default function useConnectWebSocket() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    /*현재는 토큰을 로컬스토리지에서 가져옴 */

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) setAccessToken(accessToken);
  }, []);

  /*이미 웹소켓이 연결 되어있을경우, sharedStompRef return */
  if (sharedStompRef.current || !accessToken) {
    console.log('already stomp connected');
    return sharedStompRef;
  }

  const socket = new SockJS(`${BASE_URL}/ws?chat-token=${encodeURIComponent(accessToken)}`);

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: () => {},
  });

  sharedStompRef.current = client;
  client.activate();

  return sharedStompRef;
}
