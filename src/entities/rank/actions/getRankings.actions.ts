'use server';

import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { TRankings } from '../types';

/**종합 랭킹*/
export const getAllTimeTop3Rankings = async () => {
  const res = await ApiHelper.get<TRankings>(API_URL.RANK.ALL_TIME, {
    reqType: 'server',
    cache: 'force-cache',
  });

  return res?.data?.result?.slice(0, 3);
};
