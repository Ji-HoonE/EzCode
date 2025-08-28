import ApiHelper from '@/api/client/api';
import { useMutation } from '@tanstack/react-query';
import { IReportMutationRequest } from './reply.mutation.type';
import { API_URL } from '@/api/constants/api.constants';

/** 토론, 댓글 신고 뮤테이션 */
export const useCreateReportMutation = () => {
  return useMutation({
    mutationFn: async (params: IReportMutationRequest) => {
      const response = await ApiHelper.post<IReportMutationRequest>(API_URL.REPORT, params);
      return response;
    },
  });
};
