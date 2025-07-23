import { PATHS } from '@/constants/paths';
import { useRouter, useSearchParams } from 'next/navigation';

export default function useChatDialogTrigger() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const openChatDialog = () => {
    params.set(PATHS.CHAT.SEARCHPARAMS_BASE, 'true');
    params.set(PATHS.CHAT.SEARCHPARAMS, '0');
    router.push(`?${params.toString()}`);
  };

  const closeChatDialog = () => {
    params.delete(PATHS.CHAT.SEARCHPARAMS_BASE);
    params.delete(PATHS.CHAT.SEARCHPARAMS);

    router.push(`?${params.toString()}`);
  };

  return { openChatDialog, closeChatDialog };
}
