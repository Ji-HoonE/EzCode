import ApiHelper from '@/api/client/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  AiReview,
  ChangePasswordBody,
  ChangePasswordRequest,
  DailySolved,
  IMyInfo,
  Ranking,
  SubmissionsResonse,
} from './types';
import { TPeriod } from '@/shared/types/mypage.type';
import { API_URL } from '@/api/constants/api.constants';

export const useMyInfoQuery = () => {
  return useQuery({
    queryKey: ['my-info'],
    queryFn: async () => {
      const response = await ApiHelper.get<IMyInfo>('/users');
      return response;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useMyRankingQuery = (period: TPeriod) => {
  return useQuery({
    queryKey: ['my-ranking'],
    queryFn: async () => {
      const response = await ApiHelper.get<Ranking[]>(`/rankings/me/around?period=${period}`);
      return response;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useMyAiReviewCheckQuery = () => {
  return useQuery({
    queryKey: ['my-review'],
    queryFn: async () => {
      const response = await ApiHelper.get<AiReview>(`/users/review-token`);
      return response;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useMyDailySolved = () => {
  return useQuery({
    queryKey: ['my-daily-solved'],
    queryFn: async () => {
      const response = await ApiHelper.get<DailySolved>(`/users/daily-solved`);
      return response;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (params: ChangePasswordBody) => {
      const response = await ApiHelper.put<ChangePasswordRequest>(
        `${API_URL.MYPAGE.CHANGE_PASSWORD}`,
        params
      );
      console.log(response)
      if (response.data.status === 200) {
        return response.data.result.message;
      } else {
        return response.data.message
      }
    },
  });
};

export const useSubmissionList = () => {
  return useQuery({
    queryKey: ['submission'],
    queryFn: async () => {
      const response = await ApiHelper.get<SubmissionsResonse[]>(API_URL.MYPAGE.SUBMISSION);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useEmailVerify = (redirectUrl : string) =>{
  return useMutation({
    mutationFn : async () => {
      const response = await ApiHelper.post<ChangePasswordRequest>(API_URL.MYPAGE.VERIFY_EMAIL, {redirectUrl : redirectUrl})
         if (response.data.status === 200) {
        return response.data.result.message;
      } else {
        return response.data.message
      }
    }
  })
}