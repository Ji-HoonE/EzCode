'use client';

import { ChangeEvent } from 'react';
import useChatRooms from '../hooks/useChatRooms';

export default function CreateChatRoom() {
  const { roomTitle, handleChangeTitle, createRoom } = useChatRooms();
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createRoom();
      }}
    >
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeTitle(e)}
        value={roomTitle}
        placeholder="채팅방 생성"
        className="border"
      />
      <button>채팅방 생성</button>
    </form>
  );
}
