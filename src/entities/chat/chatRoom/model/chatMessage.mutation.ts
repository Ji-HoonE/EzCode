import ApiHelper from '@/api/client/api';
import { getChatRoomApiPath } from '@/api/constants/api.constants';
import { useMutation } from '@tanstack/react-query';
import { ICreateMessage } from './chatMessage.mutation.types';

export const useCreateChatMessage = (chatRoomId: number) => {
  const path = getChatRoomApiPath(chatRoomId, 'chat');

  return useMutation({
    mutationFn: async (params: ICreateMessage) => {
      const res = await ApiHelper.post(path, params);
      return res;
    },
  });
};
