'use client';
import { getChattingRoomPath } from '@/features/chat/constants/path';
import { useConnectWebSocket } from '@/features/chat/hooks/useConnectWebSocket';
import { StompInitialRoomsType } from '@/features/chat/types/stomp';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [rooms, setRooms] = useState<StompInitialRoomsType>([]);

  const stompRef = useConnectWebSocket(
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZW1haWwiOiJnYnRteGxmQG5hdmVyLmNvbSIsInVzZXJuYW1lIjoi7Jyg7ISg7ZalIiwibmlja25hbWUiOiLsnKDshKDtlqUiLCJ1c2VyUm9sZSI6IkFETUlOIiwidGllciI6Ik5FV0JJRSIsImV4cCI6MTc1MTI2ODQ0OSwiaWF0IjoxNzUwNjYzNjQ5fQ.DoyfoP68LeybEmP8L6frvgy5-94PQeBTe3Oo-q36ejE'
  );

  useEffect(() => {
    if (!localStorage) return;
    const chatRooms = localStorage.getItem('chatRooms')
      ? (JSON.parse(localStorage.getItem('chatRooms')!) as StompInitialRoomsType)
      : [];

    setRooms(chatRooms);
  }, [stompRef]);

  return (
    <div>
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
