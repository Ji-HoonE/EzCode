import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  IGitPushAutoToggleRes,
  IGitRepoChoiceReq,
  IGitRepoChoiceRes,
} from './gitpush.mutation.types';

/**git push */
export const useGitPushAutoToggleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.put<IGitPushAutoToggleRes>(`${API_URL.GIT}`);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auto-git-push-status'] });
    },
  });
};

/**repo 선택하기 */
export const useGitRepoChoice = () => {
  return useMutation({
    mutationFn: async (params: IGitRepoChoiceReq) => {
      const response = await ApiHelper.post<IGitRepoChoiceRes>(`${API_URL.GIT}`, params);
      return response;
    },
  });
};
