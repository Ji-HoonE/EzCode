export interface Room {
  roomId: number;
  title: string;
  headCount: number;
  eventType: 'GET';
}

export type StompInitialRoomsType = Room[];

export interface StompChatMessageType {
  message: string;
  name: string;
  tier: string;
  time: string;
}
