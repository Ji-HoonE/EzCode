'use client';

import { ChatInput, useConnectWebSocket, useJoinChatRoom } from '@/features/chat';

export default function ChatRoomPage() {
  const stompRef = useConnectWebSocket();
  const messages = useJoinChatRoom(1, stompRef);

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
      <ChatInput chatRoomId={1} />
    </div>
  );
}
