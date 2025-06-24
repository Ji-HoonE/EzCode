'use client';

import { BASE_URL } from '@/constants/env';
import { ChangeEvent, useState } from 'react';

export default function CreateChatRoom() {
  const [chatRoomTitle, setChatRoomTitle] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const createChatRoom = async () => {
    fetch(`${BASE_URL}/api/chatrooms`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ title: chatRoomTitle }),
    });
  };

  return (
    <form onSubmit={createChatRoom}>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setChatRoomTitle(e.target.value)}
        value={chatRoomTitle}
      />
      <button>채팅 생성버튼</button>
    </form>
  );
}
