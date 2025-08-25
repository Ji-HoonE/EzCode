export interface ChatRoomPageProps {
  params: Promise<{ chatRoomId: string }>;
}

export type ChatRoomId = number | typeof NaN;
