/**
+ * 에러 메시지 상수 파일입니다.
+ * @example
+ * import { M } from './messages';
+ */

/**이름 */
const NAME = {
  EMPTY_NAME: '이름을 입력해 주세요',
  OVER_LENGTH_NAME: '이름은 15글자까지 가능합니다.',
};

/**이메일 */
const EMAIL = {
  EMPTY_EMAIL: '이메일을 입력해 주세요',
  INVALID_EMAIL_FORMAT: '이메일 형식이 아닙니다.',
};

/**비번 */
const PASSWORD = {
  EMPTY_PASSWORD: '비밀번호를 입력해 주세요',
  INVALID_PASSWORD_FORMAT: '비밀번호는 8-20자의 영문, 숫자, 특수문자를 포함해야 합니다.)',
};

/**비번 확인 */
const PASSWORD_CHECK = {
  EMPTY_PASSWORD_CHECK: '다시한번 입력해 주세요',
  INCORRECT_PASSWORD_CHECK: '비밀번호가 일치하지 않습니다',
};

/**나이 */
const AGE = {
  AGE_LIMIT: '20세 이상 이용 가능합니다.',
};

/**관리자 ... 예시로 작성한것임 */
const ADMIN = {
  EMPTY_TEST_CASE: '테스트 케이스를 작성해주세요',
};

export const M = {
  NAME,
  EMAIL,
  PASSWORD,
  PASSWORD_CHECK,
  AGE,
  ADMIN,
} as const;
