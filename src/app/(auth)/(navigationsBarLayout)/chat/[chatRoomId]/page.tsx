'use client';

import { ChatInput, useJoinChatRoom } from '@/features/chat';
import useChatWebSocketStore from '@/features/chat/model/useChatWebSocketStore';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatRoomPage() {
  const roomId = usePathname().split('/')[2];
  useJoinChatRoom(Number(roomId));
  const { messages } = useChatWebSocketStore();
  useEffect(() => {}, [messages]);
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
