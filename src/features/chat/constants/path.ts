import { PATHS } from '@/constants/paths';
import { ChatRoomId } from '../types';

export const CHAT_PATHS = {
  CHAT: PATHS.CHAT,
  SETTING: `${PATHS.CHAT}/setting`,
  HOME: `${PATHS.CHAT}/home`,
};

export const getChatRoomPath = (chatRoomId: ChatRoomId) => `${PATHS.CHAT}/${chatRoomId}`;
