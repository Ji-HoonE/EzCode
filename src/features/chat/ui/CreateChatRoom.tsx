'use client';

import { BASE_URL } from '@/constants/env';
import { ChangeEvent, useEffect, useState } from 'react';

export default function CreateChatRoom() {
  const [chatRoomTitle, setChatRoomTitle] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const createChatRoom = async () => {
    fetch(`${BASE_URL}/api/rooms`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ title: chatRoomTitle }),
    }).then((res) => {
      if (res.ok) return setChatRoomTitle('');
    });
  };

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createChatRoom();
      }}
    >
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setChatRoomTitle(e.target.value)}
        value={chatRoomTitle}
      />
      <button>채팅방 생성</button>
    </form>
  );
}
