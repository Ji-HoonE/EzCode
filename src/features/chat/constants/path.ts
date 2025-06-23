import { PATHS } from '@/constants/paths';
import { ChattingRoomId } from '../types';

export const CHAT_PATHS = {
  CHAT: PATHS.CHAT,
  SETTING: `${PATHS.CHAT}/setting`,
  HOME: `${PATHS.CHAT}/home`,
};

export const getChattingRoomPath = (chattingRoomId: ChattingRoomId) =>
  `${PATHS.CHAT}/${chattingRoomId}`;
