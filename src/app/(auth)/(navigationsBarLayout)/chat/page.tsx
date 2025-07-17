'use client';
import { ChatRoom, CreateChatRoom, useSubChatRooms } from '@/features/chat';

export default function ChatPage() {
  const rooms = useSubChatRooms();
  return (
    <main className="w-full flex justify-center h-full pt-20">
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
