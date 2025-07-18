'use client';
import { IMessage } from '@stomp/stompjs';
import { useEffect } from 'react';
import { ChatRoomId } from '../../types';
import { useConnectWebSocket } from '../..';
import useChatWebSocketStore, { useChatWebSocketActions } from '../../model/useChatWebSocketStore';

export default function useJoinChatRoom(chatroomId: ChatRoomId) {
  const { chatStompRef } = useConnectWebSocket();
  const { setMessage, setInitMessages } = useChatWebSocketActions();
  const { isConnected } = useChatWebSocketStore();

  useEffect(() => {
    if (!chatStompRef?.current) return;
    if (!isConnected) return;

    const joinChatRoomReceiptId = 'sub-chatRoom';
    const chatMessageReceiptId = `sub-message-${chatroomId}-${Date.now()}	`;

    if (chatStompRef.current.connected) {
      // 채팅방 메시지 초기 구독
      chatStompRef.current.subscribe(
        '/user/queue/chat',
        (msg: IMessage) => {
          try {
            const chats = JSON.parse(msg.body);
            setInitMessages(chats);
          } catch (e) {
            console.error('채팅 내역 파싱 오류', e);
          }
        },
        { receipt: joinChatRoomReceiptId }
      );

      //실시간 메시지 수신 구독
      chatStompRef.current.subscribe(
        `/topic/chat/${chatroomId}`,
        (msg: IMessage) => {
          try {
            const parsedBody = JSON.parse(msg.body);
            setMessage({ ...parsedBody });
          } catch (e) {
            setMessage({
              message: msg.body,
              tier: 'LV1',
              name: '시스템',
              time: Number(new Date()),
            });
          }
        },
        { receipt: chatMessageReceiptId }
      );

      // 입장 메시지 전송
      chatStompRef.current.publish({
        destination: `/chat/rooms/${chatroomId}/enter`,
        body: String(chatroomId),
      });
    }
  }, [isConnected, chatStompRef]);
}
