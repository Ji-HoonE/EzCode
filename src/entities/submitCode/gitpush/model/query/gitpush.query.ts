import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useQuery } from '@tanstack/react-query';
import { TGetReposResponse } from './gitpush.query.types';

/**git push */
export const useGetGitHubRepo = () => {
  return useQuery({
    queryKey: ['get-git-repos'],
    queryFn: async () => {
      const response = await ApiHelper.get<TGetReposResponse>(`${API_URL.Git}`);
      return response.data.result;
    },
  });
};
