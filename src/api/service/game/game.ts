import ApiHelper, { ReqType } from '@/api/client/api';
import {
  ICheckCharacterResponse,
  IEquipItemRequest,
  IEquipSkillRequest,
  IGetGameCharactersAdventureChoiceRequest,
  IGetGameCharactersAdventureChoiceResponse,
  IGetGameCharactersAdventureResponse,
  IGetGameCharactersInventoriesResponse,
  IGetGameCharactersItemGamblingRequest,
  IGetGameCharactersItemGamblingResponse,
  IGetGameCharactersPvpHistoryResponse,
  IGetGameCharactersPvpMatchingAcceptRequest,
  IGetGameCharactersPvpMatchingAcceptResponse,
  IGetGameCharactersPvpMatchingResponse,
  IGetGameCharactersResponse,
  IGetGameCharactersSkillGamblingResponse,
  IGetGameCharactersSkillsResponse,
} from './game.interface';
import { API_URL } from '@/api/constants/api.constants';
import { ICodeResponse } from '@/api/interface/api.interface';

/**
 * @description 게임 관련 Api
 */
export const gameApi = {
  checkCharacter: async () => {
    const response = await ApiHelper.get<ICheckCharacterResponse>(API_URL.GAME.CHECK_CHARACTER, {
      reqType: 'server',
    });
    return response;
  },
  /** 현재 캐릭터의 상태 조회 Api */
  getGameCharacters: async (pReqType: ReqType = 'server') => {
    const response = await ApiHelper.get<IGetGameCharactersResponse>(
      API_URL.GAME.GET_GAME_CHARACTERS,
      {
        reqType: pReqType,
      }
    );
    return response;
  },
  /** 현재 캐릭터 인벤토리 조회 Api */
  getGameCharactersInventories: async () => {
    const response = await ApiHelper.get<IGetGameCharactersInventoriesResponse[]>(
      API_URL.GAME.GET_GAME_CHARACTERS_INVENTORIES,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  /** 게임 캐릭터 생성 Api */
  createCharacter: async () => {
    const response = await ApiHelper.post<ICodeResponse>(API_URL.GAME.CREATE_CHARACTER, {
      reqType: 'client',
    });
    return response;
  },
  /** 캐릭터 아이템 장착 Api */
  equipItem: async (param: IEquipItemRequest) => {
    const response = await ApiHelper.patch<ICodeResponse>(API_URL.GAME.EQUIP_ITEM, param, {
      reqType: 'client',
    });
    return response;
  },
  /** 캐릭터 스킬 장착 Api */
  equipSkill: async (param: IEquipSkillRequest) => {
    const response = await ApiHelper.patch<ICodeResponse>(API_URL.GAME.EQUIP_SKILL, param, {
      reqType: 'client',
    });
    return response;
  },
  /** 캐릭터 스킬 해제 Api */
  unEquipSkill: async (param: IEquipItemRequest) => {
    const response = await ApiHelper.patch<ICodeResponse>(API_URL.GAME.UN_EQUIP_SKILL, param, {
      reqType: 'client',
    });
    return response;
  },
  /** 캐릭터 스킬 조회 Api */
  getGameCharactersSkills: async () => {
    const response = await ApiHelper.get<IGetGameCharactersSkillsResponse[]>(
      API_URL.GAME.GET_GAME_CHARACTERS_SKILLS,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  /** 무작위 배틀 매칭 Api */
  getGameCharactersPvpMatching: async () => {
    const response = await ApiHelper.get<IGetGameCharactersPvpMatchingResponse>(
      API_URL.GAME.GET_GAME_CHARACTERS_PVP_MATCHING,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  /** 배틀 수락 Api */
  getGameCharactersPvpMatchingAccept: async (
    params: IGetGameCharactersPvpMatchingAcceptRequest
  ) => {
    const response = await ApiHelper.post<IGetGameCharactersPvpMatchingAcceptResponse>(
      API_URL.GAME.GET_GAME_CHARACTERS_PVP_MATCHING_ACCEPT,
      params,
      { reqType: 'client' }
    );
    return response;
  },
  /** 방어 PVP 기록 조회 Api  */
  getGameCharactersPvpHistory: async () => {
    const response = await ApiHelper.get<IGetGameCharactersPvpHistoryResponse[]>(
      API_URL.GAME.GET_GAME_CHARACTERS_PVP_HISTORY,
      { reqType: 'client' }
    );
    return response;
  },
  /** 아이템 뽑기 Api */
  getGameCharactersItemGambling: async (params: IGetGameCharactersItemGamblingRequest) => {
    const response = await ApiHelper.post<IGetGameCharactersItemGamblingResponse>(
      API_URL.GAME.GET_GAME_CHARACTERS_ITEM_GAMBLING,
      params,
      { reqType: 'client' }
    );
    return response;
  },
  /** 스킬 뽑기 Api */
  getGameCharactersSkillGambling: async () => {
    const response = await ApiHelper.post<IGetGameCharactersSkillGamblingResponse>(
      API_URL.GAME.GET_GAME_CHARACTERS_SKILL_GAMBLING,
      {},
      { reqType: 'client' }
    );
    return response;
  },
  /** 어드벤처 Api */
  getGameCharactersAdventure: async () => {
    const response = await ApiHelper.get<IGetGameCharactersAdventureResponse>(
      API_URL.GAME.GET_GAME_CHARACTERS_ADVENTURE,
      { reqType: 'client' }
    );
    return response;
  },
  /** 어드벤처 선택지 결과 Api */
  getGameCharactersAdventureChoice: async (params: IGetGameCharactersAdventureChoiceRequest) => {
    const response = await ApiHelper.post<IGetGameCharactersAdventureChoiceResponse>(
      API_URL.GAME.GET_GAME_CHARACTERS_ADVENTURE_CHOICE,
      params,
      { reqType: 'client' }
    );
    return response;
  },
};
