'use client';
import { IMessage } from '@stomp/stompjs';
import { useEffect } from 'react';
import useConnectChatWebSocket from './useConnectChatWebSocket';
import useChatWebSocketStore, { useChatWebSocketActions } from '../../model/useChatWebSocketStore';
import { IChatRoom } from '../../model/useChatWebSocketStore.types';

export default function useSubChatRooms() {
  const { chatStompRef } = useConnectChatWebSocket();
  const { isConnected } = useChatWebSocketStore();
  const { setInitRooms, setRooms } = useChatWebSocketActions();

  useEffect(() => {
    if (!chatStompRef.current) return;
    if (!chatStompRef.current.connected) return;

    const roomReceiptId = 'sub-chatrooms';
    const roomUpdateReceiptId = 'sub-roomUpdate';

    if (chatStompRef.current.connected) {
      // 채팅 페이지 들어왔을때, 초기 채팅방 목록 구독
      chatStompRef.current.subscribe(
        '/user/queue/chatrooms',
        (msg: IMessage) => {
          const list = JSON.parse(msg.body);
          if (list.length < 1) return setInitRooms([]);
          setInitRooms(
            list.sort((a: IChatRoom, b: IChatRoom) => Number(a.roomId) - Number(b.roomId))
          );
        },
        { receipt: roomReceiptId }
      );

      //방 삭제,생성,등 업데이트 구독
      chatStompRef.current.subscribe(
        '/topic/chatrooms',
        (msg: IMessage) => {
          try {
            const updateRoom = JSON.parse(msg.body);
            setRooms(updateRoom);
          } catch (e) {
            console.error('방 변경 처리 오류', e);
          }
        },
        { receipt: roomUpdateReceiptId }
      );
      chatStompRef.current.publish({ destination: '/chat/enter', body: '입장' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);
}
