import { TZodKey } from '@/lib/zod/types';

/**스카미가 존재하는 플레이스홀더 */
export const SCHEMA_PLACEHOLDER: Record<TZodKey | string, string> = {
  email: '이메일을 입력해 주세요',
  name: '이메일을 입력해 주세요',
  userId: '아이디',
  password: '이메일을 입력해 주세요',
  passwordCheck: '이메일을 입력해 주세요',
  age: '이메일을 입력해 주세요',
};

/**스키마가 존재하지 않는 플레이스 홀더 */
export const NO_SCHEMA_PLACEHOLDER: Record<string, string> = {
  discussion: '토론을 작성해보세요!',
  reply: '댓글을 작성하세요...',
  chat: '메시지를 입력하세요...',
};
