import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useMutation } from '@tanstack/react-query';

export const useReadNotification = () => {
  return useMutation({
    mutationFn: async (notificationId: string) => {
      const result = await ApiHelper.patch(`${API_URL.NOTIFICATIONS}/${notificationId}`);

      return result;
    },
  });
};
