'use client';

import { ChatInput, useJoinChatRoom } from '@/features/chat';
import useChatWebSocketStore from '@/features/chat/model/useChatWebSocketStore';
import { usePathname } from 'next/navigation';

export default function ChatRoomPage() {
  const roomId = usePathname().split('/')[2];
  useJoinChatRoom(Number(roomId));
  const { messages } = useChatWebSocketStore();

  return (
    <main className="w-full flex justify-center h-full pt-20">
      채팅방
      {messages && (
        <ul>
          {messages.map((msg, i) => {
            if (msg.name === '시스템') {
              return (
                <li key={i} className="bg-gray-400">
                  <strong>{msg.name}</strong>: {msg.message}
                </li>
              );
            }
            return (
              <li key={i}>
                <strong>{msg.name}</strong>: {msg.message}
              </li>
            );
          })}
        </ul>
      )}
      <ChatInput chatRoomId={Number(roomId)} />
    </main>
  );
}
