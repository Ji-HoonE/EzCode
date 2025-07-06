import ApiHelper from "@/api/client/api";
import { useQuery } from "@tanstack/react-query";
import { AiReview, DailySolved, IMyInfo } from "./mypage.interface";
import { TPeriod } from "@/shared/types/mypage.type";


export const useMyInfoQuery = () => {

  return useQuery({
    queryKey: ['my-info'], 
    queryFn: async () => {
      const response = await ApiHelper.get<IMyInfo>(
        '/users'
      );
      return response;
    },

    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
};

export const useMyRankingQuery = (period : TPeriod) => {

    return useQuery({
      queryKey: ['my-ranking'], 
      queryFn: async () => {
        const response = await ApiHelper.get<IMyInfo>(
          `/rankings/me/around?period=${period}`
        );
        return response;
      },
  
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    });
  };
  
  export const useMyAiReviewCheckQuery = () => {

    return useQuery({
      queryKey: ['my-review'], 
      queryFn: async () => {
        const response = await ApiHelper.get<AiReview>(
          `/users/review-token`
        );
        return response;
      },
  
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    });
  };
  
    
  export const useMyDailySolved = () => {
    return useQuery({
      queryKey: ['my-daily-solved'], 
      queryFn: async () => {
        const response = await ApiHelper.get<DailySolved>(
          `/users/daily-solved`
        );
        return response;
      },
  
      staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    });
  };
  