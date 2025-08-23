import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useQuery } from '@tanstack/react-query';
import { IGitPushAutoToggleResponse, TGetReposResponse } from './gitpush.query.types';
import { useSession } from 'next-auth/react';

/**git push */
export const useGetGitHubRepo = (githubUrl: string | null) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken?.split(' ')[1] as string;
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
  const { data: session } = useSession();
  const accessToken = session?.accessToken?.split(' ')[1] as string;

  return useQuery({
    queryKey: ['auto-git-push-status'],
    queryFn: async () => {
      const response = await ApiHelper.get<IGitPushAutoToggleResponse>(`${API_URL.GIT}/status`);
      return response.data.result;
    },
    enabled: !!accessToken && !!githubUrl,
  });
};
