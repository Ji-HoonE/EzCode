import { gameApi } from '@/api/service/game/game';
import { IGetGameCharactersItemGamblingRequest } from '@/api/service/game/game.interface';
import { useQuery } from '@tanstack/react-query';

/** 캐릭터 스테이터스 조회 Api */
export const useGetGameCharactersStatusQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ['characterStatus'],
    queryFn: async () => {
      const response = await gameApi.getGameCharacters('client');
      return response;
    },
    staleTime: 0,
    gcTime: 0,
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
    staleTime: 0,
    gcTime: 0,
    enabled: isOpen,
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

/** 방어 PVP 기록 조회 Api  */
export const useGetGameCharactersPvpHistoryQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ['characterPvpHistory'],
    queryFn: async () => {
      const response = await gameApi.getGameCharactersPvpHistory();
      return response;
    },
    enabled: isOpen,
  });
};

/** 어드벤처 Api */
export const useGetGameCharactersAdventureQuery = (isOpen: boolean) => {
  return useQuery({
    queryKey: ['characterAdventure'],
    queryFn: async () => {
      const response = await gameApi.getGameCharactersAdventure();
      return response;
    },
    enabled: isOpen,
    staleTime: 0,
    gcTime: 0,
  });
};

// /** 스킬 뽑기 Api */
// export const useGetGameCharactersSkillGamblingQuery = () => {
//   return useQuery({
//     queryKey: ['characterSkillGambling'],
//     queryFn: async () => {
//       const response = await gameApi.getGameCharactersSkillGambling();
//       return response;
//     },
//   });
// };
