'use client';
import { getChattingRoomPath } from '@/features/chat/constants/path';
import Link from 'next/link';
import { StompInitialRoomsType } from '@/features/chat/types/stomp';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const WebSocketClient = dynamic(() => import('@/features/chat/ui/WebSocketClient'), {
  ssr: false,
});

export default function ChatPage() {
  const [rooms, setRooms] = useState<StompInitialRoomsType>([]);

  useEffect(() => {
    if (!localStorage) return;
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
          const path = getChattingRoomPath(room.roomId);
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
    </div>
  );
}
