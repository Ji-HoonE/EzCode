'use client';
import { getChatRoomPath, StompInitialRoomsType } from '@/features/chat';
import CreateChatRoom from '@/features/chat/ui/CreateChatRoom';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const WebSocketClient = dynamic(() => import('@/features/chat/ui/WebSocketClient'), {
  ssr: false,
});

export default function ChatPage() {
  const [rooms, setRooms] = useState<StompInitialRoomsType>([]);

  useEffect(() => {
    const chatRooms = localStorage.getItem('chatRooms')
      ? (JSON.parse(localStorage.getItem('chatRooms')!) as StompInitialRoomsType)
      : [];

    setRooms(chatRooms);
  }, []);

  return (
    <div>
      <WebSocketClient />
      {rooms.length > 0 ? (
        rooms.map((room) => {
          const path = getChatRoomPath(room.roomId);
          return (
            <Link href={path} key={room.roomId}>
              <p>{room.title}</p>
              <p>{room.headCount}명</p>
            </Link>
          );
        })
      ) : (
        <div>생성된 채팅방이 없습니다.</div>
      )}
      <CreateChatRoom />
    </div>
  );
}
