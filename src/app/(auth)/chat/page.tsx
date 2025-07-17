'use client';
import { ChatRoom, CreateChatRoom, useSubChatRooms } from '@/features/chat';

export default function ChatPage() {
  const rooms = useSubChatRooms();
  return (
    <main>
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
