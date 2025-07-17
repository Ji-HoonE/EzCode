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
      />
      <button onClick={createMessage}>채팅보내기</button>
    </div>
  );
}
