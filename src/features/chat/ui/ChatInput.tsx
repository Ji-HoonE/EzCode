'use client';

import { BASE_URL } from '@/constants/env';
import { ChangeEvent, useEffect, useState } from 'react';
import { ChatRoomId } from '../types';

export default function ChatInput({ chatRoomId }: { chatRoomId: ChatRoomId }) {
  const [accessToken, setAccessToken] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const handleSubmitChat = async () => {
    fetch(`${BASE_URL}/api/rooms/${chatRoomId}/chat`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ message: value }),
    }).then(() => setValue(''));
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
