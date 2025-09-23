'use client';
import { useEffect } from 'react';
import useChatWebSocketStore, { useChatWebSocketActions } from '../../model/useChatWebSocketStore';
import { useConnectWebSocket } from '../..';

export default function useLeaveChatRoom() {
  // chatStompRef: RefObject<Client | null>,
  const { chatStompRef } = useConnectWebSocket();

  const { leavedRoom } = useChatWebSocketStore();
  const { clearMessages } = useChatWebSocketActions();

  useEffect(() => {
    if (leavedRoom === 0 || !chatStompRef?.current) return;
    if (chatStompRef.current?.connected) {
      try {
        chatStompRef.current.publish({
          destination: `/chat/rooms/${leavedRoom}/left`,
          body: String(leavedRoom),
        });
      } catch (err) {
        console.error('퇴장 메시지 전송 오류', err);
      } finally {
        clearMessages();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatStompRef, leavedRoom]);
}
