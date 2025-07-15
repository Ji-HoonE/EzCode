'use client';

import { IMessage } from '@stomp/stompjs';
import useProblemWebSocketStore, {
  useProblemWebSocketStoreActions,
} from '@/features/submitCode/submission/model/useProblemWebSocketStore';
import { useEffect } from 'react';
import useConnectProblemWebSocket from './useConnectProblemWebSocket';

export default function useSubscribeProblem(sessionKey: string) {
  const { setMessage, clearMessages } = useProblemWebSocketStoreActions();
  const { problemStompRef } = useConnectProblemWebSocket();
  const { isConnected } = useProblemWebSocketStore();

  useEffect(() => {
    if (!problemStompRef.current) return;

    const base = `/user/queue/submission/${sessionKey}`;

    if (problemStompRef.current.connected) {
      problemStompRef.current.subscribe(`${base}/case`, (msg: IMessage) => {
        setMessage('results', JSON.parse(msg.body));
      });
      problemStompRef.current.subscribe(`${base}/final`, (msg: IMessage) =>
        setMessage('totalResult', JSON.parse(msg.body))
      );
      problemStompRef.current.subscribe(`/topic/submission/${sessionKey}/error`, (msg: IMessage) =>
        setMessage('error', JSON.parse(msg.body))
      );
      problemStompRef.current.subscribe(`${base}/git-status`, (msg: IMessage) => {
        setMessage('git-status', JSON.parse(msg.body));
      });

      // 에러 발생 시 스토어 초기화
      problemStompRef.current.onStompError = () => {
        clearMessages();
      };

      // 클라이언트가 끊겼을때
      problemStompRef.current.onDisconnect = () => {
        clearMessages();
      };
    }
  }, [isConnected, setMessage, clearMessages, sessionKey, problemStompRef]);
}
