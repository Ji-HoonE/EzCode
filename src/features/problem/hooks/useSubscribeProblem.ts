'use client';

import { Client, IMessage } from '@stomp/stompjs';
import useProblemWebSocketStore, {
  useProblemWebSocketStoreActions,
} from '@/features/problem/model/useProblemWebSocketStore';
import { RefObject, useEffect } from 'react';

export default function useSubscribeProblem({
  problemStompRef,
}: {
  problemStompRef: RefObject<Client | null>;
}) {
  const { sessionKey } = useProblemWebSocketStore();
  const { setStatus, setMessage, clearMessages } = useProblemWebSocketStoreActions();

  useEffect(() => {
    if (!sessionKey || !problemStompRef.current) return;

    const base = `/user/queue/submission/${sessionKey}`;
    if (problemStompRef.current.connected) {
      setStatus(true);
      problemStompRef.current.subscribe(`${base}/init`, (msg: IMessage) =>
        setMessage('initCases', JSON.parse(msg.body))
      );
      problemStompRef.current.subscribe(`${base}/case`, (msg: IMessage) => {
        setMessage('results', JSON.parse(msg.body));
      });
      problemStompRef.current.subscribe(`${base}/final`, (msg: IMessage) =>
        setMessage('finalResult', JSON.parse(msg.body))
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
        setStatus(false);
      };

      // 클라이언트가 끊겼을때
      problemStompRef.current.onDisconnect = () => {
        setStatus(false);
      };
    }
  }, [sessionKey, problemStompRef, setMessage, clearMessages, setStatus]);
}
