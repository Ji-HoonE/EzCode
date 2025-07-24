import { Client } from '@stomp/stompjs';

export const sharedAlarmStompRef: { current: Client | null } = {
  current: null,
};
