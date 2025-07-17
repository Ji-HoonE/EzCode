import {
  useCreateChatRoomMutation,
  useDeleteChatRoomMutation,
} from '@/entities/chat/chatRoom/model/chatRoom.mutation';
import { title } from 'process';
import { ChangeEvent, useState } from 'react';

export default function useChatRooms() {
  const [roomTitle, setRoomTitle] = useState('');
  const { mutateAsync: deleteRoomMutation, isPending: deletePending } = useDeleteChatRoomMutation();
  const { mutateAsync: createRoomMutation } = useCreateChatRoomMutation();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(e.target.value.trim());
  };
  const createRoom = () => {
    if (!title) return;
    createRoomMutation({ title: roomTitle });
    setRoomTitle('');
  };

  const deleteRoom = (roomId: number) => {
    deleteRoomMutation({ roomId: String(roomId) });
  };

  return {
    roomTitle,
    handleChangeTitle,
    deleteRoom,
    deletePending,
    createRoom,
  };
}
