'use client';

import { PATHS } from '@/constants/paths';
import { useRouter } from 'next/navigation';

export default function ChatTriggerButton() {
  const router = useRouter();
  return <button onClick={() => router.push(PATHS.CHAT)}>이거 채팅버튼임</button>;
}
