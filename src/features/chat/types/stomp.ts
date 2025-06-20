export interface Room {
  roomId: number;
  title: string;
  headCount: number;
  eventType: 'GET';
}

export type StompInitialRoomsType = Room[];
