import { useCreateChatMessage } from '@/entities/chat/chatRoom/model/chatMessage.mutation';
import { ChangeEvent, useState } from 'react';

export default function useChatMessage(roomId: number) {
  const [value, setValue] = useState('');
  const { mutateAsync: createMessageMutation } = useCreateChatMessage(roomId);

  const handleChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const createMessage = () => {
    createMessageMutation({ message: value });
  };
  return {
    value,
    setValue,
    handleChangeMessage,
    createMessage,
  };
}
