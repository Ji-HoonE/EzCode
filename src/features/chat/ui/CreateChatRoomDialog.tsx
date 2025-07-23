'use client';

import { ChangeEvent } from 'react';
import useChatRooms from '../hooks/useChatRooms';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CreateChatRoomButton from './CreateChatRoomButton';
import { Button } from '@/components/ui/button';

export default function CreateChatRoomDialog() {
  const { roomTitle, handleChangeTitle, createRoom } = useChatRooms();

  return (
    <Dialog>
      <DialogTrigger>
        <CreateChatRoomButton />
      </DialogTrigger>
      <DialogContent>
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
          <Button>채팅방 생성</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
