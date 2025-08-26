'use client';
import { IMessage, StompSubscription } from '@stomp/stompjs';
import { useRef, useEffect } from 'react';
import { ChatRoomId, useConnectWebSocket } from '../..';
import useChatWebSocketStore, { useChatWebSocketActions } from '../../model/useChatWebSocketStore';

export default function useJoinChatRoom(chatroomId: ChatRoomId) {
  const { chatStompRef } = useConnectWebSocket();
  const { setRealTimeMessage, setInitMessages } = useChatWebSocketActions();
  const { isConnected } = useChatWebSocketStore();

  // 구독 객체 저장용 ref
  const userQueueSubRef = useRef<StompSubscription | null>(null);
  const topicSubRef = useRef<StompSubscription | null>(null);

  useEffect(() => {
    if (!chatroomId || !chatStompRef?.current) return;

    if (chatStompRef.current.connected) {
      // 채팅방 메시지 초기 구독후 구독 객체 저장
      userQueueSubRef.current = chatStompRef.current.subscribe(
        '/user/queue/chat',
        (msg: IMessage) => {
          try {
            const chats = JSON.parse(msg.body);
            setInitMessages(chats);
          } catch (e) {
            console.error('채팅 내역 파싱 오류', e);
          }
        }
      );

      //실시간 메시지 수신 구독후 구독 객체 저장
      topicSubRef.current = chatStompRef.current.subscribe(
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
        }
      );

      // 입장 메시지 전송
      chatStompRef.current.publish({
        destination: `/chat/rooms/${chatroomId}/enter`,
        body: String(chatroomId),
      });
    }

    return () => {
      // cleanup에서 구독 해지
      if (userQueueSubRef.current) {
        userQueueSubRef.current.unsubscribe();
        userQueueSubRef.current = null;
      }
      if (topicSubRef.current) {
        topicSubRef.current.unsubscribe();
        topicSubRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, chatStompRef, chatroomId]);
}
