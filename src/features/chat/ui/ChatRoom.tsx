'use client';

import { Button } from '@/components/ui/button';
import { ChatInput, useJoinChatRoom } from '@/features/chat';
import useChatWebSocketStore from '@/features/chat/model/useChatWebSocketStore';
import useChatRooms from '../hooks/useChatRooms';

interface ChatProps {
  roomId: string;
}
export default function ChatRoom({ roomId }: ChatProps) {
  useJoinChatRoom(Number(roomId));
  const { messages } = useChatWebSocketStore();
  const { deleteRoom } = useChatRooms();

  return (
    <main className="w-full flex justify-center h-full pt-20">
      {roomId !== '0' ? (
        <div>
          <Button onClick={() => deleteRoom(Number(roomId))}>삭제</Button>
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
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <p className="text-white text-lg">채팅방을 선택해주세요</p>
          <p className="text-white text-sm">코딩 문제를 함께 해결해보세요!</p>
        </div>
      )}
    </main>
  );
}
