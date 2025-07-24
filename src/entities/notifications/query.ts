import ApiHelper from "@/api/client/api"
import { API_URL } from "@/api/constants/api.constants"
import { useQuery } from "@tanstack/react-query"

export const useGetNotification = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const result = await ApiHelper.get(API_URL.NOTIFICATIONS);
      return result;
    },

    staleTime: 1000 * 60 * 5,
  });
};