'use client';
import { RefObject, useEffect } from 'react';
import { ChatRoomId } from '../../types';
import useChatWebSocketStore, { useChatWebSocketActions } from '../../model/useChatWebSocketStore';
import { Client } from '@stomp/stompjs';

export default function useLeaveChatRoom(
  chatStompRef: RefObject<Client | null>,
  chatroomId: ChatRoomId
) {
  const { isLeaveRoom } = useChatWebSocketStore();
  const { clearMessages } = useChatWebSocketActions();

  console.log(isLeaveRoom);
  useEffect(() => {
    if (chatroomId === 0 || !chatStompRef?.current || !isLeaveRoom) return;
    console.log('퇴장 훅 실행');
    if (chatStompRef.current?.connected) {
      try {
        chatStompRef.current.publish({
          destination: `/chat/rooms/${chatroomId}/leave`,
          body: String(chatroomId),
        });
      } catch (err) {
        console.error('퇴장 메시지 전송 오류', err);
      } finally {
        clearMessages();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatStompRef, chatroomId, isLeaveRoom]);
}
