'use client';
import { IMessage } from '@stomp/stompjs';
import { Room, StompInitialRoomsType } from '../types/stomp';
import { useState } from 'react';
import useConnectWebSocket from './useConnectWebSocket';

export default function useSubChatRooms() {
  const [chatRooms, setChatRooms] = useState<StompInitialRoomsType>([]);

  const stompRef = useConnectWebSocket();

  if (!stompRef.current) return chatRooms;

  const roomReceiptId = 'sub-chatrooms';
  const roomUpdateReceiptId = 'sub-roomUpdate';

  stompRef.current.onConnect = () => {
    if (!stompRef.current) return;
    // 채팅 페이지 들어왔을때, 초기 채팅방 목록 구독
    stompRef.current.subscribe(
      '/user/queue/chatrooms',
      (msg: IMessage) => {
        try {
          const list = JSON.parse(msg.body);
          setChatRooms(list.sort((a: Room, b: Room) => Number(a.roomId) - Number(b.roomId)));
        } catch (e) {
          console.error('채팅방 목록 불러오기 오류 ', e);
        }
      },
      { receipt: roomReceiptId }
    );

    //방 삭제,생성,등 업데이트 구독
    stompRef.current.subscribe(
      '/topic/chatrooms',
      (msg: IMessage) => {
        try {
          const update = JSON.parse(msg.body);
          switch (update.eventType) {
            case 'CREATE': {
              return setChatRooms((prev) => [...prev, update]);
            }
            case 'DELETE': {
              return setChatRooms((prev) => prev.filter((room) => room.roomId !== update.roomId));
            }
            case 'UPDATE': {
              return setChatRooms((prev) =>
                prev.map((room) => (room.roomId === update.roomId ? update : room))
              );
            }
          }
        } catch (e) {
          console.error('방 변경 처리 오류', e);
        }
      },
      { receipt: roomUpdateReceiptId }
    );
    stompRef.current.publish({ destination: '/chat/enter', body: '선향' });
  };

  return chatRooms;
}
