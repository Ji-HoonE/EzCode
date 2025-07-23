'use client';

import { ChangeEvent } from 'react';
import useChatRooms from '../hooks/useChatRooms';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function CreateChatRoomDialog() {
  const { roomTitle, handleChangeTitle, createRoom } = useChatRooms();

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex justify-center items-center rounded-[999px] bg-secondary w-9 h-9">
          <Image width={24} height={24} src="/icons/plus.svg" alt="생성하기 버튼" />
        </div>
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
