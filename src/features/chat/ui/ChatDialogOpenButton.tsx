'use client';

import useChatDialogTrigger from '../hooks/useChatDialogTrigger';

export default function ChatDialogOpenButton() {
  const { openChatDialog } = useChatDialogTrigger();

  return <button onClick={openChatDialog}>이거 채팅버튼임</button>;
}
