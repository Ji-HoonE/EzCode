/**@notice e.g.) import {M} from './...' 해서 사용해주세요! */

/**로그인,회원가입 */
const AUTH = {
  /**이름 */
  EMPTY_NAME: '이름을 입력해 주세요',
  OVER_LENGTH_NAME: '이름은 10글자까지 가능합니다.',
  DUPLICATED_NAME: '이미 존재하는 이름입니다.',

  /**아이디 */
  EMPTY_ID: '아이디를 입력해주세요',
  INVALID_ID_FORMAT: '아이디 형식 맞춰주세요',

  /**이메일 */
  EMPTY_EMAIL: '이메일을 입력해 주세요',
  INVALID_EMAIL_FORMAT: '이메일 형식이 아닙니다.',

  /**비번 */
  EMPTY_PASSWORD: '비밀번호를 입력해 주세요',
  INVALID_PASSWORD_FORMAT: '비번 형식 맞춰주세요',

  /**비번 확인 */
  EMPTY_PASSWORD_CHECK: '다시한번 입력해 주세요',
  INCORRECT_PASSWORD_CHECK: '비밀번호가 일치하지 않습니다',

  /**나이 */
  AGE_LIMIT: '20세 이상 이용 가능합니다.',
};

/**관리자 ... 예시로 작성한것임 */
const ADMIN = {
  /**테스트 케이스 */
  EMPTY_TEST_CASE: '테스트 케이스를 작성해주세요',
};

export const M = { AUTH, ADMIN };
