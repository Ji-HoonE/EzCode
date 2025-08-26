import { PATHS } from '@/constants/paths';
import { useRouter, useSearchParams } from 'next/navigation';
import { useChatWebSocketActions } from '../model/useChatWebSocketStore';

export default function useChatDialogTrigger() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const { setIsLeaved } = useChatWebSocketActions();

  const openChatDialog = () => {
    params.set(PATHS.CHAT.SEARCHPARAMS_ID, 'NaN');
    params.set(PATHS.CHAT.SEARCHPARAMS_TITLE, 'null');

    router.push(`?${params.toString()}`);
  };

  const handleSwitchRoom = (roomId: number, title: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const prevRoomId = params.get(PATHS.CHAT.SEARCHPARAMS_ID);
    if (prevRoomId && Number(prevRoomId) !== roomId) {
      setIsLeaved(true);
      params.set(PATHS.CHAT.SEARCHPARAMS_ID, String(roomId));
      params.set(PATHS.CHAT.SEARCHPARAMS_TITLE, title);

      router.push(`?${params.toString()}`);
    }
  };

  const closeChatDialog = () => {
    setIsLeaved(true);
    params.delete(PATHS.CHAT.SEARCHPARAMS_ID);
    params.delete(PATHS.CHAT.SEARCHPARAMS_TITLE);

    router.push(`?${params.toString()}`);
  };

  return { openChatDialog, handleSwitchRoom, closeChatDialog };
}
