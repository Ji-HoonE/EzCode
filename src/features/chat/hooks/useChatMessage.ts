import { useCreateChatMessage } from '@/entities/chat/chatRoom/model/chatMessage.mutation';
import { ChangeEvent, useState } from 'react';

export default function useChatMessage(roomId: number) {
  const [value, setValue] = useState('');
  const { mutateAsync: createMessageMutation } = useCreateChatMessage(roomId);

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const createMessage = () => {
    if (!value) return;
    createMessageMutation({ message: value });
    setValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      createMessage();
    }
  };

  return {
    value,
    setValue,
    handleChangeMessage,
    createMessage,
    handleKeyDown,
  };
}
