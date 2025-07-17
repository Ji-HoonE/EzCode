'use client';

import { ChangeEvent } from 'react';
import { ChatRoomId } from '../types';
import useChatMessage from '../hooks/useChatMessage';

export default function ChatInput({ chatRoomId }: { chatRoomId: ChatRoomId }) {
  const { value, handleChangeMessage, createMessage } = useChatMessage(chatRoomId);

  return (
    <div>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeMessage(e)}
        value={value}
        className="border"
        placeholder="채팅을 입력해주세요"
      />
      <button onClick={createMessage}>채팅보내기</button>
    </div>
  );
}
