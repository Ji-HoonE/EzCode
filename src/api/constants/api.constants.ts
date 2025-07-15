import { ProblemId } from '@/shared';
import { TGetProblemIdOptions } from '@/shared/types/pathOptions';

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
    GET_GAME_CHARACTERS_SKILLS: '/games/characters/skills/unequipped',
  },
  Git: '/users/github',
  MYPAGE: {
    CHANGE_PASSWORD: '/users/password',
    SUBMISSION: '/submissions',
  },
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
