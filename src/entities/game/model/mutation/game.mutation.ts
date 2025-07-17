import { gameApi } from '@/api/service/game/game';
import {
  IEquipItemRequest,
  IGetGameCharactersAdventureChoiceRequest,
  IGetGameCharactersItemGamblingRequest,
  IGetGameCharactersPvpMatchingAcceptRequest,
} from '@/api/service/game/game.interface';
import { useMutation } from '@tanstack/react-query';

/** 캐릭터 생성 뮤테이션 */
export const useCreateCharacterMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await gameApi.createCharacter();
      return response;
    },
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

/** 배틀 수락 Api*/
export const useGetGameCharactersPvpMatchingAcceptQuery = () => {
  return useMutation({
    mutationFn: async (params: IGetGameCharactersPvpMatchingAcceptRequest) => {
      const response = await gameApi.getGameCharactersPvpMatchingAccept(params);
      return response;
    },
  });
};

/** 아이템 뽑기 Api */
export const useGetGameCharactersItemGamblingQuery = () => {
  return useMutation({
    mutationFn: async (params: IGetGameCharactersItemGamblingRequest) => {
      const response = await gameApi.getGameCharactersItemGambling(params);
      return response;
    },
  });
};

/** 스킬 뽑기 Api */
export const useGetGameCharactersSkillGamblingQuery = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await gameApi.getGameCharactersSkillGambling();
      return response;
    },
  });
};

/** 어드벤처 선택지 결과 Api */
export const useGetGameCharactersAdventureChoiceQuery = () => {
  return useMutation({
    mutationFn: async (params: IGetGameCharactersAdventureChoiceRequest) => {
      const response = await gameApi.getGameCharactersAdventureChoice(params);
      return response;
    },
  });
};
