'use client';

import { ChatInput, useJoinChatRoom } from '@/features/chat';
import useChatWebSocketStore from '@/features/chat/model/useChatWebSocketStore';
import SystemMessage from '../chatMessage/SystemMessage';
import ChatMessage from '../chatMessage/ChatMessage';
import ChatRoomHeader from './ChatRoomHeader';

interface ChatProps {
  roomId: string;
  roomTitle: string;
}

export default function ChatRoom({ roomId, roomTitle }: ChatProps) {
  useJoinChatRoom(Number(roomId));
  const { messages } = useChatWebSocketStore();
  return (
    <section className="w-full flex h-full flex-col justify-center flex-4/5">
      {roomId !== '0' ? (
        <>
          <ChatRoomHeader roomTitle={roomTitle} />
          {messages && (
            <ul className="flex-1 p-4 flex flex-col gap-4">
              {messages.map((msg, i) => {
                if (msg.name === '시스템') {
                  return <SystemMessage msg={msg} key={i} />;
                }
                return <ChatMessage msg={msg} key={i} />;
              })}
            </ul>
          )}
          <ChatInput chatRoomId={Number(roomId)} />
        </>
      ) : (
        <div className="flex flex-col justify-center  items-center">
          <p className="text-white text-lg">채팅방을 선택해주세요</p>
          <p className="text-white text-sm">코딩 문제를 함께 해결해보세요!</p>
        </div>
      )}
    </section>
  );
}
