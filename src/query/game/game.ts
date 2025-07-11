import { gameApi } from '@/api/service/game/game';
import {
  IEquipItemRequest,
  IGetGameCharactersPvpMatchingAcceptRequest,
} from '@/api/service/game/game.interface';
import { useMutation, useQuery } from '@tanstack/react-query';

/** 캐릭터 생성 뮤테이션 */
export const useCreateCharacterMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await gameApi.createCharacter();
      return response;
    },
  });
};

/** 캐릭터 스테이터스 조회 Api */
export const useGetGameCharactersStatusQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ['characterStatus'],
    queryFn: async () => {
      const response = await gameApi.getGameCharacters('client');
      return response;
    },
    enabled: isOpen,
  });
};

/** 현재 캐릭터 인벤토리 조회 Api */
export const useGetGameCharactersInventoriesQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ['characterInventories'],
    queryFn: async () => {
      const response = await gameApi.getGameCharactersInventories();
      return response;
    },
    enabled: isOpen,
  });
};

/** 캐릭터 아이템 장착 뮤테이션 */
export const useGameCharacterEquipItemMutation = () => {
  return useMutation({
    mutationFn: async (param: IEquipItemRequest) => {
      const response = await gameApi.equipItem(param);
      return response;
    },
  });
};

/** 캐릭터 스킬 조회 Api */
export const useGetGameCharactersSkillsQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ['characterSkills'],
    queryFn: async () => {
      const response = await gameApi.getGameCharactersSkills();
      return response;
    },
    enabled: isOpen,
  });
};

/** 무작위 배틀 매칭  Api */
export const useGetGameCharactersPvpMatchingQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ['characterPvpMatching'],
    queryFn: async () => {
      const response = await gameApi.getGameCharactersPvpMatching();
      return response;
    },
    enabled: isOpen,
  });
};

/** 배틀 수락 Api*/
export const useGetGameCharactersPvpMatchingAcceptQuery = () => {
  return useMutation({
    mutationFn: async (params: IGetGameCharactersPvpMatchingAcceptRequest) => {
      const response = await gameApi.getGameCharactersPvpMatchingAccept(params);
      return response;
    },
  });
};
