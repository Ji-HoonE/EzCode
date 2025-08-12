import { z } from 'zod';
import { M } from './messages';

/**@description 각각의 validate를 작성하고, z.object로 스키마 생성시에는 여기서 import 해서 사용합니다. */
export const Name = z
  .string()
  .min(1, { message: M.NAME.EMPTY_NAME })
  .max(10, { message: M.NAME.OVER_LENGTH_NAME });

export const ID = z
  .string()
  .nonempty(M.ID.EMPTY_ID)
  .regex(/^[a-z0-9]{4,30}$/, M.ID.INVALID_ID_FORMAT);

export const EMAIL = z.string().nonempty(M.EMAIL.EMPTY_EMAIL).email(M.EMAIL.INVALID_EMAIL_FORMAT);

export const PASSWORD = z
  .string()
  .nonempty(M.PASSWORD.EMPTY_PASSWORD)
  .regex(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
    M.PASSWORD.INVALID_PASSWORD_FORMAT
  );

export const PASSWORD_CHECK = z.string().nonempty(M.PASSWORD_CHECK.EMPTY_PASSWORD_CHECK);
