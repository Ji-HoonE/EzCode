'use client';
import { IMessage } from '@stomp/stompjs';
import { useEffect } from 'react';
import { ChatRoomId } from '../../types';
import { useConnectWebSocket } from '../..';
import useChatWebSocketStore, { useChatWebSocketActions } from '../../model/useChatWebSocketStore';
import useLeaveChatRoom from './useLeaveChatRoom';

export default function useJoinChatRoom(chatroomId: ChatRoomId) {
  const { chatStompRef } = useConnectWebSocket();
  const { setRealTimeMessage, setInitMessages, setIsLeaved } = useChatWebSocketActions();
  const { isConnected } = useChatWebSocketStore();
  useLeaveChatRoom(chatStompRef, chatroomId);

  useEffect(() => {
    if (!chatroomId) return;

    if (!chatStompRef?.current) return;
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
            setRealTimeMessage({ ...parsedBody });
          } catch {
            setRealTimeMessage({
              message: msg.body,
              tier: 'LV1',
              name: '시스템',
              time: String(new Date()),
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

    return () => {
      setIsLeaved(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chatStompRef, chatroomId]);
}
