import { TVoteStatus } from '@/features/problem/types/discussion.response.data.type';

export interface IVoteIconProps {
  status: TVoteStatus;
  onClick: () => void;
}
