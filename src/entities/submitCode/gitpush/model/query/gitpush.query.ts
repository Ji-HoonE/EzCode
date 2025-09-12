import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useQuery } from '@tanstack/react-query';
import { IGitPushAutoToggleResponse, TGetReposResponse } from './gitpush.query.types';
import Cookies from 'js-cookie';

/**git push */
export const useGetGitHubRepo = (githubUrl: string | null) => {
  const accessToken = Cookies.get('accessToken');
  return useQuery({
    queryKey: ['get-git-repos'],
    queryFn: async () => {
      const response = await ApiHelper.get<TGetReposResponse>(`${API_URL.GIT}`);
      return response.data.result;
    },
    enabled: !!accessToken && !!githubUrl,
  });
};

/**유저의 gitPush auto 유무를 파악합니다. */
export const useAutoGitPushStatus = (githubUrl: string | null) => {
  const accessToken = Cookies.get('accessToken');

  return useQuery({
    queryKey: ['auto-git-push-status'],
    queryFn: async () => {
      const response = await ApiHelper.get<IGitPushAutoToggleResponse>(`${API_URL.GIT}/status`);
      return response.data.result;
    },
    enabled: !!accessToken && !!githubUrl,
  });
};
