import ApiHelper from '@/api/client/api';
import { useQuery } from '@tanstack/react-query';
import { ProblemList } from './types';
import { PATHS } from '@/constants/paths';

export const useProblemListQuery = (
  page: number,
  size: number,
  sort: string,
  categoryCode?: string,
  difficulty?: string,
  keyword?: string
) => {
  const queryParams: Record<string, string> = {};
  if (difficulty && difficulty !== '전체') queryParams.difficulty = difficulty;
  if (categoryCode && categoryCode !== '전체') queryParams.categoryCode = categoryCode;
  if (keyword) queryParams.keyword = keyword;
  return useQuery({
    queryKey: ['problemList', page, size, sort, categoryCode, difficulty, keyword],
    queryFn: async () => {
      const response = await ApiHelper.get<ProblemList>(
        `${PATHS.PROBLEMS}?page=${page}&size=${size}&sort=${sort}`,
        { params: queryParams }
      );
      return {
        content: response.data.result.content,
        totalPages: response.data.result.totalPages,
      };
    },
    staleTime: 1000 * 60 * 5,
  });
};
export const useAutoCompleteKeywordQuery = (keyword: string) => {
  return useQuery({
    queryKey: ['autoCompleteKeyword', keyword],
    queryFn: async () => {
      const response = await ApiHelper.get<string[]>(`${PATHS.AUTO_COMPLETE}`, {
        params: { keyword: keyword },
      });
      if (!response.data.result) {
        return [];
      }
      return response.data.result;
    },
    staleTime: 1000 * 60 * 30,
  });
};
