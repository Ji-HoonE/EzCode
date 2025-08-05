import { IRanking } from '../rankings/actions/getRankings.actions.types';

export type TAroundRanking = IRanking & { isMe: boolean };
