import { TVoteStatus } from '@/entities/vote';

export interface IVoteIconProps {
  status: TVoteStatus;
  onClick: () => void;
}
