export interface IUserInfo {
  userId: number;
  nickname: string;
  tier: TUserTier;
  profileImageUrl: null | string;
}

export type TUserTier = 'NEWBIE' | 'LEARNER' | 'CODER' | 'PRO' | 'HACKER' | 'GOAT';
