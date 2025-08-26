import { IChatMessage } from '../../model/useChatWebSocketStore.types';

export interface IChatMessageProps {
  msg: IChatMessage;
  userNickname?: string;
}
export default function SystemMessage({ msg }: IChatMessageProps) {
  return (
    <li className="text-center w-full flex justify-center">
      <div className="px-2 bg-gray-700 w-fit rounded-2xl">
        <strong>{msg.message}</strong>
      </div>
    </li>
  );
}
