'use client';
import { ChatRoom, StompInitialRoomsType } from '@/features/chat';
import CreateChatRoom from '@/features/chat/ui/CreateChatRoom';

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
    <main>
      <WebSocketClient />
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room) => {
            return <ChatRoom key={room.roomId} room={room} />;
          })}
        </ul>
      ) : (
        <div>생성된 채팅방이 없습니다.</div>
      )}
      <CreateChatRoom />
    </main>
  );
}
