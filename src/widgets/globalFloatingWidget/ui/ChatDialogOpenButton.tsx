'use client';

import useChatDialogTrigger from '@/features/chat/hooks/useChatDialogTrigger';
import { SendIcon } from 'lucide-react';

export default function ChatDialogOpenButton() {
  const { openChatDialog } = useChatDialogTrigger();

  return (
    <button
      onClick={openChatDialog}
      className="bg-primary hover:bg-hover-primary rounded-full w-14 h-14  shadow-lg hover:shadow-xl flex justify-center items-center"
    >
      <SendIcon className="w-4 h-4" />
    </button>
  );
}
