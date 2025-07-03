'use client';

import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { BASE_URL } from '@/constants/env';
import { sharedStompRef } from '@/shared/lib/stomp/sharedStompRef';
import { useProblemWebSocketStoreActions } from '@/features/problem/model/submitProblemStore';
import { useEffect } from 'react';
import useAccessToken from '@/entities/auth/hooks/useAuthToken';

export default function useConnectProblemWebSocket(sessionKey: string) {
  const accessToken = useAccessToken();
  const { setStatus, setMessage, clearMessages } = useProblemWebSocketStoreActions();
  const problemStompRef = sharedStompRef;

  useEffect(() => {
    if (problemStompRef.current || !accessToken) {
      console.log('already problem stomp connected');
      return;
    }

    if (!accessToken || !sessionKey) return;

    const socket = new SockJS(`${BASE_URL}/ws?token=${encodeURIComponent(accessToken)}`);
    const client = new Client({ webSocketFactory: () => socket, reconnectDelay: 5000 });
    const base = `/user/queue/submission/${sessionKey}`;
    client.onConnect = () => {
      setStatus(true);
      client.subscribe(`${base}/init`, (msg: IMessage) =>
        setMessage('initCases', JSON.parse(msg.body))
      );
      client.subscribe(`${base}/case`, (msg: IMessage) => {
        setMessage('results', JSON.parse(msg.body));
      });
      client.subscribe(`${base}/final`, (msg: IMessage) =>
        setMessage('finalResult', JSON.parse(msg.body))
      );
      client.subscribe(`/topic/submission/${sessionKey}/error`, (msg: IMessage) =>
        setMessage('error', JSON.parse(msg.body))
      );
      client.subscribe(`${base}/git-status`, (msg: IMessage) => {
        setMessage('git-status', JSON.parse(msg.body));
      });
    };

    // 에러 발생 시 스토어 초기화
    client.onStompError = () => {
      clearMessages();
      setStatus(false);
    };

    // 클라이언트가 끊겼을때
    client.onDisconnect = () => {
      setStatus(false);
    };

    //활성화
    problemStompRef.current = client;
    client.activate();

    // cleanup
    return () => {
      client.deactivate();
      setStatus(false);
    };
  }, [accessToken, sessionKey, problemStompRef, setMessage, clearMessages, setStatus]);
}
