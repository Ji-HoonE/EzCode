'use client';

import useConnectWebSocket from '@/features/chat/hooks/useConnectWebSocket';

export default function WebSocketClient() {
  useConnectWebSocket();

  return null;
}
