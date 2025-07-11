interface IStats {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}

interface IRealStat {
  atk: number;
  def: number;
  speed: number;
  crit: number;
  stun: number;
  evasion: number;
  accuracy: number;
  hp: number;
  ap: number;
}

interface ISkill {
  skillEffect: string;
  grade: string;
  name: string;
  skillDetails: string;
  slotType: string;
}
/** 현재 캐릭터 상태 조회 응답 인터페이스 */
export interface IGetGameCharactersResponse {
  name: string;
  stats: IStats;
  realStat: IRealStat;
  gold: number;
  items: IGetGameCharactersInventoriesResponse[];
  skills: ISkill[];
}

/** 유저 캐릭터 보유 여부 체크 응답 인터페이스 */
export interface ICheckCharacterResponse {
  isCharacterExist: boolean;
}

/** 현재 캐릭터 인벤토리 조회 응답 인터페이스 */
export interface IGetGameCharactersInventoriesResponse {
  itemCategory: string;
  itemType: string;
  grade: string;
  name: string;
  description: string;
  atk: number;
  crit: number;
  stun: number;
  accuracy: number;
  def: number;
  speed: number;
  evasion: number;
}

/** 캐릭터 아이템 장착 요청 인터페이스 */
export interface IEquipItemRequest {
  name: string;
}
/** 캐릭터 스킬 조회 응답 인터페이스 */
export interface IGetGameCharactersSkillsResponse {
  skillEffect: string;
  grade: string;
  name: string;
  skillDetails: string;
  slotType: string;
}

/** 무작위 배틀 매칭 응답 인터페이스 */
export interface IGetGameCharactersPvpMatchingResponse {
  isEnemyStrongThanMe: boolean;
  message: string;
  enemyIdToken: string;
}

/** 배틀 수락 요청 인터페이스 */
export interface IGetGameCharactersPvpMatchingAcceptRequest {
  battleToken: string;
}

/** 배틀 수락 응답 인터페이스 */
export interface IGetGameCharactersPvpMatchingAcceptResponse {
  playerNickName: string;
  enemyNickName: string;
  battleLog: string[];
  isPlayerWin: boolean;
}
