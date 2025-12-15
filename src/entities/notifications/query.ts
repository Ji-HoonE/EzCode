import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useReadNotification = () => {
  return useMutation({
    mutationFn: async (notificationId: string) => {
      const result = await ApiHelper.patch(`${API_URL.NOTIFICATIONS}/${notificationId}`);

      return result;
    },
  });
};
export const useGetNotifications = (page: number, isWebSocketConnected: boolean) => {
  return useQuery({
    queryKey: ['notifications', page],
    queryFn: async () => {
      const result = await ApiHelper.get(
        `${API_URL.NOTIFICATIONS}?pageable=page&page=${page}&size=5`
      );

      return result;
    },
    enabled: isWebSocketConnected,
    staleTime: 0,
  });
};
