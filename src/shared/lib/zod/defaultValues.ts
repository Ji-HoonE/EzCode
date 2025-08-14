import { TZodKey } from './types';

/**@notice defaultValue 작성 파일입니다. */
export const ZOD_DEFAULT_VALUES = {
  email: '',
  password: '',
  name: '',
  passwordCheck: '',
  age: 20,
} as const satisfies Partial<Record<TZodKey, string | number | boolean>>;
