import ApiHelper from '@/api/client/api';
import { useQuery } from '@tanstack/react-query';
import { ProblemList } from './problem.interface';

export const useProblemListQuery = (page: number, size: number, sort: string,categoryCode? : string,difficulty?:string) => {
const queryParams: Record<string, string> = {};
if (difficulty && difficulty !== "전체") queryParams.difficulty = difficulty;
if (categoryCode && categoryCode !== "전체") queryParams.categoryCode = categoryCode;
  return useQuery({
    queryKey: ['problemList', page, size, sort,categoryCode,difficulty], 
    queryFn: async () => {
      const response = await ApiHelper.get<ProblemList>(
        `/problems?page=${page}&size=${size}&sort=${sort}`,{params : queryParams }
      );
      return response;
    },

    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
  });
};
