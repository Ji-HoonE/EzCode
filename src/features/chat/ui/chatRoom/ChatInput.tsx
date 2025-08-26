'use client';

import { ChatRoomId } from '../../types';
import useChatMessage from '../../hooks/useChatMessage';
import { Send } from 'lucide-react';
import UnifiedInput from '@/shared/ui/InputFiled';

export default function ChatInput({ chatRoomId }: { chatRoomId: ChatRoomId }) {
  const { value, handleChangeMessage, createMessage, handleKeyDown } = useChatMessage(chatRoomId);
  return (
    <div className="p-4 border-t border-primary/20">
      <div className="flex items-end space-x-3">
        <UnifiedInput
          inputType="textarea"
          name="chat"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChangeMessage(e)}
          onKeyDown={handleKeyDown}
          className="border-primary rounded-[10px] min-h-5 focus:outline-none focus:border-secondary/70"
        />
        <button
          aria-label="send message"
          type="button"
          onClick={createMessage}
          disabled={!value.trim()}
          className="bg-[#214d35] hover:bg-[#276e48] disabled:bg-[#214d35]/50 disabled:cursor-not-allowed text-white p-3 rounded-[10px] transition-all duration-200 hover:shadow-lg active:scale-95"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
