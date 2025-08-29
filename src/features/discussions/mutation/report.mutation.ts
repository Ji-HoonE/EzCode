import ApiHelper from '@/api/client/api';
import { useMutation } from '@tanstack/react-query';
import { API_URL } from '@/api/constants/api.constants';
import { IReportRequestData } from '@/features/report/report.types';

/** 토론, 댓글 신고 뮤테이션 */
export const useCreateReportMutation = () => {
  return useMutation({
    mutationFn: async (params: IReportRequestData) => {
      const response = await ApiHelper.post<IReportRequestData>(API_URL.REPORT, params);
      return response;
    },
  });
};
