import { M } from '@/shared/lib/zod/messages';
import { EMAIL, Name, PASSWORD, PASSWORD_CHECK } from '@/shared/lib/zod/primitives';
import { z } from 'zod';

/**로그인 스키마 */
/**자동 타입 추론 */
export type TSigninSchemaRegister = z.infer<typeof SIGNIN_ZOD_SCHEMA>;

export const SIGNIN_ZOD_SCHEMA = z.object({
  email: EMAIL,
  password: PASSWORD,
});

/**-------------------------------------------------------------------------*/

/**회원 가입 스키마 */
/**자동 타입 추론 */
export type TSignupSchemaRegister = z.infer<typeof SIGNUP_ZOD_SCHEMA>;

export const SIGNUP_ZOD_SCHEMA = z
  .object({
    name: Name,
    email: EMAIL,
    password: PASSWORD,
    passwordCheck: PASSWORD_CHECK,
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: M.PASSWORD_CHECK.INCORRECT_PASSWORD_CHECK,
  });
