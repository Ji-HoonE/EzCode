// components/WebSocketClient.tsx
'use client';

import { useConnectWebSocket } from '@/features/chat/hooks/useConnectWebSocket';

export default function WebSocketClient() {
  useConnectWebSocket(
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwiZW1haWwiOiJnYnRteGxmQG5hdmVyLmNvbSIsInVzZXJuYW1lIjoi7Jyg7ISg7ZalIiwibmlja25hbWUiOiLsnKDshKDtlqUiLCJ1c2VyUm9sZSI6IkFETUlOIiwidGllciI6Ik5FV0JJRSIsImV4cCI6MTc1MTM1NDYzOCwiaWF0IjoxNzUwNzQ5ODM4fQ.rOfonT6Ptm7jScA55olDRO2JSHUooR5HVzZmwV1NWCo'
  );

  return null;
}
