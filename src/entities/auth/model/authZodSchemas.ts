import { M } from '@/lib/zod/schema_message';
import z from 'zod';

/**자동 타입 추론 */
export type TAuthSchemaRegister = z.infer<typeof AUTH_ZOD_SCHEMA>;

/**@notice validate 작성 , input에서 사용할 name을 레지스터 key 로 등록해주세요 */
/**@description - 해당 스키마는 임의로 작성, 기획에 따라 사용시 확인후 수정 부탁드려요*/

export const AUTH_ZOD_SCHEMA = z
  .object({
    name: z
      .string()
      .min(1, { message: M.AUTH.EMPTY_NAME })
      .max(10, { message: M.AUTH.OVER_LENGTH_NAME }),

    userId: z
      .string()
      .nonempty(M.AUTH.EMPTY_ID)
      .regex(/^[a-z0-9]{4,30}$/, M.AUTH.INVALID_ID_FORMAT),

    email: z.string().nonempty(M.AUTH.EMPTY_EMAIL).email(M.AUTH.INVALID_EMAIL_FORMAT),

    password: z
      .string()
      .nonempty(M.AUTH.EMPTY_PASSWORD)
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
        M.AUTH.INVALID_PASSWORD_FORMAT
      ),

    passwordCheck: z.string().nonempty(M.AUTH.EMPTY_PASSWORD_CHECK),

    age: z.number().min(20, { message: M.AUTH.AGE_LIMIT }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: M.AUTH.INCORRECT_PASSWORD_CHECK,
  });
