// /features/chat/stores/stompClientStore.ts
import { Client } from '@stomp/stompjs';
import { createRef } from 'react';

export const sharedStompRef = createRef<Client | null>();
