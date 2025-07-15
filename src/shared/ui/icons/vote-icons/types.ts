import { TVoteStatus } from '@/entities/discussions/vote';

export interface IVoteIconProps {
  status: TVoteStatus;
  onClick: () => void;
}
