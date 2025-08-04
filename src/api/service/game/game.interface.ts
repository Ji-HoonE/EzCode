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

/** 방어 PVP 기록 조회 응답 인터페이스 */
export interface IGetGameCharactersPvpHistoryResponse {
  attackerNickName: string;
  PlayerNickName: string;
  battleLog: string;
  isDefenderWin: boolean;
  battleCreatedAt: string;
}

/** 아이템 뽑기 요청 인터페이스 */
export interface IGetGameCharactersItemGamblingRequest {
  itemCategory: string;
}

/** 아이템 뽑기 응답 인터페이스 */
export interface IGetGameCharactersItemGamblingResponse {
  itemResponse: IGetGameCharactersItemGamblingItemResponse;
  message: string;
}

export interface IGetGameCharactersItemGamblingItemResponse {
  itemCategory: string;
  itemType: string;
  grade: string;
  name: string;
  description: string;
  speed: number;
  crit: number;
  stun: number;
  evasion: number;
  accuracy: number;
  atk?: number;
  def?: number;
}

/** 스킬 뽑기 응답 인터페이스 */
export interface IGetGameCharactersSkillGamblingResponse {
  response: IGetGameCharactersSkillGamblingResponseResponse;
  message: 'string';
}

export interface IGetGameCharactersSkillGamblingResponseResponse {
  skillEffect: string;
  grade: string;
  name: string;
  skillDetails: string;
  slotType: string;
}

/** 어드벤처 응답 인터페이스 */
export interface IGetGameCharactersAdventureResponse {
  encounterId: string;
  encounterCategory: string;
  name: string;
  choice1Text: string;
  choice2Text: string;
  encounterText: string;
}

/** 어드벤처 선택지 결과 요청 인터페이스 */
export interface IGetGameCharactersAdventureChoiceRequest {
  encounterToken: string;
  playerDecision: boolean;
}

/** 어드벤처 선택지 결과 응답 인터페이스 */
export interface IGetGameCharactersAdventureChoiceResponse {
  log: string;
  isPositive: boolean;
}
