'use client';

import { BASE_URL } from '@/constants/env';
import { ChangeEvent, useState } from 'react';
import { ChatRoomId } from '../types';

export default function ChatInput({ chatRoomId }: { chatRoomId: ChatRoomId }) {
  const accessToken = localStorage.getItem('accessToken');
  const [value, setValue] = useState('');

  const handleSubmitChat = async () => {
    fetch(`${BASE_URL}/api/room/${chatRoomId}/chat`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ message: value }),
    });
  };

  return (
    <div>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        value={value}
      />
      <button onClick={handleSubmitChat}>채팅보내기</button>
    </div>
  );
}
