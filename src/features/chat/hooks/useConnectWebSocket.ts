'use client';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Room } from '../types/stomp';
import { sharedStompRef } from '../store/stompClientStore';

const BASE_WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

export function useConnectWebSocket(token: string) {
  // const stompRef = useRef<Client | null>(null);

  if (sharedStompRef.current) {
    console.log('already stomp connected');
    return sharedStompRef;
  }

  const socket = new SockJS(`${BASE_WEBSOCKET_URL}/ws?token=${encodeURIComponent(token)}`);

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    debug: () => {},
  });

  client.onConnect = () => {
    const roomReceiptId = 'sub-chatrooms';

    // 채팅방 목록 구독
    client.subscribe(
      '/user/queue/chatrooms',
      (msg: IMessage) => {
        console.log('채팅방:', JSON.parse(msg.body));

        try {
          const list = JSON.parse(msg.body);
          localStorage.setItem(
            'chatRooms',
            JSON.stringify(list.sort((a: Room, b: Room) => Number(a.roomId) - Number(b.roomId)))
          );
        } catch (e) {
          console.error('채팅방 목록 파싱 오류', e);
        }
      },
      { receipt: roomReceiptId }
    );

    client.publish({ destination: '/chat/enter', body: '선향' });

    // //채팅방 목록 변경 구독 (업데이트 시 오름차순 정렬 유지)
    // client.subscribe('/topic/chatrooms', (msg: IMessage) => {
    //   console.log(JSON.parse(msg.body));
    //   try {
    //     const update = JSON.parse(msg.body);
    //     setRooms((prev) => {
    //       if (!prev) return;
    //       const exists = prev.find((r) => r.roomId === update.roomId);
    //       if (update.eventType === 'DELETE') {
    //         return prev.filter((r) => r.roomId !== update.roomId);
    //       } else if (exists) {
    //         return prev.map((r) => (r.roomId === update.roomId ? update : r));
    //       } else {
    //         return [...prev, update].sort((a, b) => Number(a.roomId) - Number(b.roomId));
    //       }
    //     });
    //   } catch (e) {
    //     console.error('방 변경 처리 오류', e);
    //   }
    // });
  };
  sharedStompRef.current = client;
  client.activate();
  return sharedStompRef;
}
