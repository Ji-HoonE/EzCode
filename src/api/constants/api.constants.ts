import { ProblemId } from '@/shared';
import { TGetChatRoomIdOptions, TGetProblemIdOptions } from '@/shared/types/pathOptions';

/** API 요청 주소 */
export const API_URL = {
  AUTH: {
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
    REFRESH: '/auth/refresh',
    LOGOUT: '/logout',
    FIND_PASSWORD: '/auth/find-password',
    RESET_PASSWORD: '/auth/reset-password',
    FIND_PASSWORD_VERIFY: '/auth/find-password-verify',
    WITHDRAW: '/users/withdraw',
  },
  PROBLEM: {
    GET_PROBLEMS: '/problems',
  },
  GAME: {
    CHECK_CHARACTER: '/games/characters/check',
    GET_GAME_CHARACTERS: '/games/characters',
    CREATE_CHARACTER: '/games/characters',
    GET_GAME_CHARACTERS_INVENTORIES: '/games/characters/inventories',
    EQUIP_ITEM: '/games/characters/items/equip',
    EQUIP_SKILL: '/games/characters/skills/equip',
    UN_EQUIP_SKILL: '/games/characters/skills/unequip',
    GET_GAME_CHARACTERS_SKILLS: '/games/characters/skills/unequipped',
    GET_GAME_CHARACTERS_PVP_MATCHING: '/games/characters/battles/matching',
    GET_GAME_CHARACTERS_PVP_MATCHING_ACCEPT: '/games/characters/battles',
    GET_GAME_CHARACTERS_PVP_HISTORY: '/games/characters/battles',
    GET_GAME_CHARACTERS_ITEM_GAMBLING: '/games/characters/items/gamble',
    GET_GAME_CHARACTERS_SKILL_GAMBLING: '/games/characters/skills/gamble',
    GET_GAME_CHARACTERS_ADVENTURE: '/games/characters/encounters/matching',
    GET_GAME_CHARACTERS_ADVENTURE_CHOICE: '/games/characters/encounters/choice',
  },
  GIT: '/users/github',
  MYPAGE: {
    CHANGE_PASSWORD: '/users/password',
    SUBMISSION: '/submissions',
    VERIFY_EMAIL: '/email/send',
    REPORT: '/reports/my',
    USER_INFO: '/users',
    UPLOAD_IMG: '/users/profile',
  },
  USER: {
    TOKEN_COUNT: '/users/review-token',
  },
  CHAT: {
    ROOMS: '/rooms',
  },
  RANK: {
    WEEKLY: '/rankings/weekly',
    ALL_TIME: '/rankings/all-time',
    LASTWEEK: '/rankings/last-week',
    AROUNDEME: '/rankings/me/around',
  },
  NOTIFICATIONS: '/notifications',
  LANGUAGES: '/languages',
  REPORT: '/reports',
};

/** API 요청 주소 */
export const API_CONSTANTS = {
  CODE: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
  },
};

export const getProblemIdPath = (problemId: ProblemId, pathOption?: TGetProblemIdOptions) => {
  return `${API_URL.PROBLEM.GET_PROBLEMS}/${problemId}/${pathOption}`;
};

export const getChatRoomApiPath = (chatRoomId: number, pathOption?: TGetChatRoomIdOptions) => {
  return `${API_URL.CHAT.ROOMS}/${chatRoomId}/${pathOption}`;
};
