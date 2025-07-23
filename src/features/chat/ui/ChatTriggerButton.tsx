'use client';

import { PATHS } from '@/constants/paths';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ChatTriggerButton() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const chatDialogOpen = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(PATHS.CHAT.SEARCHPARAMS, '0');
    router.push(`${PATHS.CHAT.BASE}/?${params.toString()}`);
  };

  return <button onClick={chatDialogOpen}>이거 채팅버튼임</button>;
}
