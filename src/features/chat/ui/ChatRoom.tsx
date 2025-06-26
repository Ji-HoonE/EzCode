'use client';
import { BASE_URL } from '@/constants/env';
import { getChatRoomPath } from '../constants/path';
import { Room } from '../types/stomp';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ChatRoom({ room }: { room: Room }) {
  const [accessToken, setAccessToken] = useState('');

  const path = getChatRoomPath(room.roomId);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const deleteChatRoom = () => {
    fetch(`${BASE_URL}/api/rooms`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ roomId: room.roomId }),
    });
  };

  return (
    <li className="flex">
      <Link href={path} key={room.roomId}>
        <p>{room.title}</p>
        <p>{room.headCount}명</p>
      </Link>
      <button onClick={deleteChatRoom}>방삭제</button>
    </li>
  );
}
