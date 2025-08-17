import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useQuery } from '@tanstack/react-query';
import { TAroundRanking, TRankings } from './types';
import { useSession } from 'next-auth/react';

export const useGetRankAlltime = () => {
  return useQuery({
    queryKey: ['rank'],
    queryFn: async () => {
      const response = await ApiHelper.get<TRankings>(API_URL.RANK.ALL_TIME);
      return response.data.result;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetRankThisWeek = () => {
  return useQuery({
    queryKey: ['rank-thisWeek'],
    queryFn: async () => {
      const response = await ApiHelper.get<TRankings>(API_URL.RANK.WEEKLY);
      return response.data.result;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetRankLastWeek = () => {
  return useQuery({
    queryKey: ['rank-lastWeek'],
    queryFn: async () => {
      const response = await ApiHelper.get<TRankings>(API_URL.RANK.LASTWEEK);
      return response.data.result;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetRankAroundMe = (period: 'all-time' | 'weekly' | 'last-week') => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken?.split(' ')[1] as string;
  return useQuery({
    queryKey: ['rank-me-around', period],
    queryFn: async () => {
      const response = await ApiHelper.get<TAroundRanking[]>(API_URL.RANK.AROUNDEME, {
        params: {
          period: period,
        },
      });
      return response.data.result;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
};
