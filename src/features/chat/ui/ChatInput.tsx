'use client';

import { useRef } from 'react';
import { ChatRoomId } from '../types';
import useChatMessage from '../hooks/useChatMessage';
import { Send } from 'lucide-react';

export default function ChatInput({ chatRoomId }: { chatRoomId: ChatRoomId }) {
  const { value, handleChangeMessage, createMessage, handleKeyPress } = useChatMessage(
    Number(chatRoomId)
  );
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="p-4 border-t border-primary/20">
      <div className="flex items-end space-x-3">
        <div className="flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => handleChangeMessage(e)}
            onKeyDown={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="w-full bg-[#1a2332] border border-[#214d35]/30 rounded-[10px] px-4 py-3 text-white placeholder-[#888] focus:outline-none focus:border-[#00d084] transition-colors resize-none"
          />
        </div>
        <button
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
