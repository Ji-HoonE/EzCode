import { TVoteStatus } from '@/entities/discussions';

export interface IVoteIconProps {
  status: TVoteStatus;
  onClick: () => void;
}
