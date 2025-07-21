'use server';

import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { TWeeklyRankings } from './getRankings.actions.types';

/**이번주 랭킹*/
export const getWeeklyRankings = async () => {
  const res = await ApiHelper.get<TWeeklyRankings>(API_URL.RANK.WEEKLY, {
    reqType: 'server',
    cache: 'force-cache',
  });
  return res.data.result;
};
