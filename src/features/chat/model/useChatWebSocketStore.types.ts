type EventType = 'GET' | 'CREATE' | 'DELETE' | 'UPDATE';

//room
export interface IChatRoom {
  roomId: number;
  title: string;
  headCount: number;
  eventType: EventType;
}

//messages
export interface IChatMessage {
  message: string;
  name: string;
  tier: string;
  time: string;
}

/** setMessage 상태 인터페이스 */
export interface IInitialState {
  isConnected: boolean;
  rooms: IChatRoom[] | [];
  messages: IChatMessage[] | [];
}

/**store 초기 상태*/
export const INITIAL_STATE: IInitialState = {
  isConnected: false,
  rooms: [],
  messages: [],
};

/** 스토어 액션 인터페이스 */
interface IChatWebSocketStoreActions {
  actions: {
    setIsConnected: (status: boolean) => void;
    setInitRooms: (rooms: IChatRoom[] | []) => void;
    setRooms: (response: IChatRoom) => void;
    setInitMessages: (message: IChatMessage[]) => void;
    setMessage: (message: IChatMessage) => void;
    setEnterMessage: (message: string) => void;
    clearMessages: () => void;
    clearStore: () => void;
  };
}

/** 인증 스토어 타입 */
export type IChatWebSocketStore = IInitialState & IChatWebSocketStoreActions;
