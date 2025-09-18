'use client';
import { formatDate } from '@/shared/util/formatDate';
import { IChatMessageProps } from './SystemMessage';

export default function ChatMessage({ msg, userNickname }: IChatMessageProps) {
  const isOwn = msg.name === userNickname;
  const formattedDate = formatDate(msg.time);

  return (
    <li className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
      <p className={`text-sm ${isOwn ? 'text-right' : 'text-left'}`}>{msg.name}</p>
      <div
        className={`max-w-[70%] w-fit px-4 py-2 rounded-[14px] ${isOwn ? ' bg-primary' : ' bg-secondary-background'}`}
      >
        <p className="whitespace-pre-wrap break-words">{msg.message}</p>
      </div>
      <p className={`text-xs text-gray500 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
        {formattedDate}
      </p>
    </li>
  );
}
