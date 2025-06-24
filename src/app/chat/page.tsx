'use client';
import { useConnectWebSocket } from '@/features/chat/hooks/useConnectWebSocket';
import { StompInitialRoomsType } from '@/features/chat/types/stomp';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [rooms, setRooms] = useState<StompInitialRoomsType>([]);

  const stompRef = useConnectWebSocket(
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZW1haWwiOiJnYnRteGxmQG5hdmVyLmNvbSIsInVzZXJuYW1lIjoi7Jyg7ISg7ZalIiwibmlja25hbWUiOiLsnKDshKDtlqUiLCJ1c2VyUm9sZSI6IkFETUlOIiwidGllciI6Ik5FV0JJRSIsImV4cCI6MTc1MTAyNzQ5NywiaWF0IjoxNzUwNDIyNjk3fQ.GYBJkFE4Q_GyiRNjefuyanChGs4h0LJuRyzIrHTdJE0'
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
          return (
            <div key={room.roomId}>
              <p>{room.title}</p> <p>{room.roomId}</p>
            </div>
          );
        })
      ) : (
        <div>생성된 채팅방이 없습니다.</div>
      )}
    </div>
  );
}
