import { z } from 'zod';
import { M } from './messages';

/**@description 각각의 validate를 작성하고, z.object로 스키마 생성시에는 여기서 import 해서 사용합니다. */
export const Name = z
  .string()
  .min(1, { message: M.NAME.EMPTY_NAME })
  .max(15, { message: M.NAME.OVER_LENGTH_NAME });

export const EMAIL = z
  .string()
  .min(1, { message: M.EMAIL.EMPTY_EMAIL })
  .email(M.EMAIL.INVALID_EMAIL_FORMAT);

export const PASSWORD = z
  .string()
  .min(1, { message: M.PASSWORD.EMPTY_PASSWORD })
  .regex(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?])(?=.*[0-9]).{8,20}$/,
    M.PASSWORD.INVALID_PASSWORD_FORMAT
  );

export const PASSWORD_CHECK = z.string().min(1, { message: M.PASSWORD_CHECK.EMPTY_PASSWORD_CHECK });
