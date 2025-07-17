'use client';
import { IMessage } from '@stomp/stompjs';
import { useState } from 'react';
import { ChatRoomId } from '../../types';
import { StompChatMessageType } from '../../types/stomp';
import { useConnectWebSocket } from '../..';

export default function useJoinChatRoom(chatroomId: ChatRoomId) {
  const [messages, setMessages] = useState<StompChatMessageType[]>([]);
  const { chatStompRef } = useConnectWebSocket();

  if (!chatStompRef?.current) return messages;

  const joinChatRoomReceiptId = 'sub-chatRoom';
  const chatMessageReceiptId = `sub-message-${chatroomId}-${Date.now()}	`;

  if (chatStompRef.current.connected) {
    // 채팅방 메시지 초기 구독
    chatStompRef.current.subscribe(
      '/user/queue/chat',
      (msg: IMessage) => {
        try {
          const chats = JSON.parse(msg.body);
          setMessages(chats);
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
          const chat = JSON.parse(msg.body);
          setMessages((prev) => [...prev, chat]);
        } catch {
          setMessages((prev) => [
            ...prev,
            { name: '시스템', message: msg.body, tier: '', time: '' },
          ]);
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
  return messages;
}
