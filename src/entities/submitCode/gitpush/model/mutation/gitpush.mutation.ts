import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useMutation } from '@tanstack/react-query';
import {
  IGitPushAutoToggleRes,
  IGitRepoChoiceReq,
  IGitRepoChoiceRes,
} from './gitpush.mutation.types';

/**git push */
export const useGitPushAutoToggleMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.put<IGitPushAutoToggleRes>(`${API_URL.Git}`);
      return response;
    },
  });
};

/**repo 선택하기 */
export const useGitRepoChoice = () => {
  return useMutation({
    mutationFn: async (params: IGitRepoChoiceReq) => {
      const response = await ApiHelper.post<IGitRepoChoiceRes>(`${API_URL.Git}`, params);
      return response;
    },
  });
};
