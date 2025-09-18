'use client';

import { ChatInput, useJoinChatRoom } from '@/features/chat';
import useChatWebSocketStore from '@/features/chat/model/useChatWebSocketStore';
import SystemMessage from '../chatMessage/SystemMessage';
import ChatMessage from '../chatMessage/ChatMessage';
import ChatRoomHeader from './ChatRoomHeader';
import { useMyInfoQuery } from '@/entities/mypage/model/query';
import { useEffect, useRef } from 'react';

interface ChatProps {
  roomId: number;
  roomTitle: string;
}

export default function ChatRoom({ roomId, roomTitle }: ChatProps) {
  useJoinChatRoom(roomId);
  const { data } = useMyInfoQuery();
  const endRef = useRef<HTMLDivElement>(null);
  const nickname = data?.data.result.nickname;
  const { initMessages, realTimeMessages } = useChatWebSocketStore();
  // const { setIsLeaved } = useChatWebSocketActions();

  // useEffect(() => {
  //   setIsLeaved(false);
  // }, [roomId]);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [realTimeMessages, initMessages]);

  return (
    <section className="w-full flex h-full flex-col justify-center flex-4/5">
      {!!roomId ? (
        <>
          <ChatRoomHeader roomTitle={roomTitle} />
          <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-scroll">
            {initMessages && (
              <ul className="flex flex-col gap-4 h-fit">
                {initMessages.map((msg, i) => (
                  <ChatMessage msg={msg} key={i} userNickname={nickname} />
                ))}
              </ul>
            )}
            {realTimeMessages && (
              <ul className="flex flex-col gap-4 h-fit">
                {realTimeMessages.map((msg, i) => {
                  if (msg.name === '시스템') {
                    return <SystemMessage msg={msg} key={i} />;
                  }
                  return <ChatMessage msg={msg} key={i} userNickname={nickname} />;
                })}
              </ul>
            )}
            <div ref={endRef} />
          </div>
          <ChatInput chatRoomId={roomId} />
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
