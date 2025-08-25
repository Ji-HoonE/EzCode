'use client';
import { formatDate } from '@/shared/util/formatDate';
import { IChatMessageProps } from './SystemMessage';

export default function ChatMessage({ msg, userNickname }: IChatMessageProps) {
  const isOwn = msg.name === userNickname;
  const formattedDate = formatDate(msg.time);

  return (
    <li className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-2 rounded-[14px] ${
            isOwn ? 'bg-[#214d35] text-white' : 'bg-[#1a2332] text-white'
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{msg.message}</p>
        </div>
        <p className={`text-xs text-[#888] mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
          {formattedDate}
        </p>
      </div>
    </li>
  );
}
