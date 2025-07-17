import ApiHelper from '@/api/client/api';
import { useQuery } from '@tanstack/react-query';
import { ProblemList, ProblemsContent } from './types';

export const useProblemListQuery = (
  page: number,
  size: number,
  sort: string,
  categoryCode?: string,
  difficulty?: string,
  keyword?: string
) => {
  const isSearching = Boolean(keyword && keyword.trim() !== '');
  const queryParams: Record<string, string> = {};
  if (difficulty && difficulty !== '전체') queryParams.difficulty = difficulty;
  if (categoryCode && categoryCode !== '전체') queryParams.categoryCode = categoryCode;
  if (isSearching && keyword) queryParams.keyword = keyword;

  const endpoint = isSearching ? '/problems/search' : '/problems';

  return useQuery({
    queryKey: ['problemList', endpoint, page, size, sort, categoryCode, difficulty, keyword],
    queryFn: async () => {
      if (isSearching) {
        const response = await ApiHelper.get<ProblemsContent[]>(
          `${endpoint}`, //
          { params: queryParams }
        );
        const result = response.data.result;

        const startIdx = (page - 1) * size;
        const sliced = result.slice(startIdx, startIdx + size);

        return {
          content: sliced,
          totalPages: Math.ceil(result.length / size),
        };
      } else {
        const response = await ApiHelper.get<ProblemList>(
          `${endpoint}?page=${page}&size=${size}&sort=${sort}`,
          { params: queryParams }
        );
        return {
          content: response.data.result.content,
          totalPages: response.data.result.totalPages,
        };
      }
    },
    enabled: isSearching ? !!keyword?.trim() : true,
    staleTime: 1000 * 60 * 5,
  });
};
