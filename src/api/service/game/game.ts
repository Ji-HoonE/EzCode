import ApiHelper, { ReqType } from '@/api/client/api';
import {
  ICheckCharacterResponse,
  IEquipItemRequest,
  IGetGameCharactersInventoriesResponse,
  IGetGameCharactersResponse,
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
};
