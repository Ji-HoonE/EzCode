'use client';

import { ChatInput, useJoinChatRoom } from '@/features/chat';
import { usePathname } from 'next/navigation';

export default function ChatRoomPage() {
  const roomId = usePathname().split('/')[2];
  const messages = useJoinChatRoom(Number(roomId));

  return (
    <div className="flex flex-col">
      채팅방
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            <strong>{msg.name}</strong>: {msg.message}
          </li>
        ))}
      </ul>
      <ChatInput chatRoomId={Number(roomId)} />
    </div>
  );
}
