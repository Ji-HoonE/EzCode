import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useQuery } from '@tanstack/react-query';
import { IReviewToken } from './getTokenCount.query.types';

/**git push */
export const useGetTokenCountQuery = () => {
  return useQuery({
    queryKey: ['get-review-token'],
    queryFn: async () => {
      const response = await ApiHelper.get<IReviewToken>(`${API_URL.USER.TOKEN_COUNT}`);
      return response.data.result;
    },
  });
};
