import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useMutation } from '@tanstack/react-query';
import { ICreateRoomReq, IDeleteRoomReq } from './chatRoom.mutation.types';

export const useCreateChatRoomMutation = () => {
  return useMutation({
    mutationFn: async (params: ICreateRoomReq) => {
      const res = await ApiHelper.post(`${API_URL.CHAT.ROOMS}`, params);
      return res.data.result;
    },
  });
};

export const useDeleteChatRoomMutation = () => {
  return useMutation({
    mutationFn: async (params: IDeleteRoomReq) => {
      const res = await ApiHelper.delete(`${API_URL.CHAT.ROOMS}`, { params: { ...params } });
      return res;
    },
  });
};
