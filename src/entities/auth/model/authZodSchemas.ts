import { M } from '@/shared/lib/zod/messages';
import { EMAIL, Name, PASSWORD, PASSWORD_CHECK } from '@/shared/lib/zod/primitives';
import { z } from 'zod';

/**자동 타입 추론 */
export type TAuthSchemaRegister = z.infer<typeof AUTH_ZOD_SCHEMA>;

/**@notice validate 작성 , input에서 사용할 name을 레지스터 key 로 등록해주세요 */
/**@description - 해당 스키마는 임의로 작성, 기획에 따라 사용시 확인후 수정 부탁드려요*/

export const AUTH_ZOD_SCHEMA = z
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

export const TEST_SCHEMA = z.object({
  email: EMAIL,
  password: PASSWORD,
});
