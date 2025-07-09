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
};

/** API 요청 주소 */
export const API_CONSTANTS = {
  CODE: {
    OK: 200,
    CREATED: 201,
  },
};

export const getProblemIdPath = (problemId: ProblemId, pathOption?: TGetProblemIdOptions) => {
  return `${API_URL.PROBLEM.GET_PROBLEMS}/${problemId}/${pathOption}`;
};
