import { ISubmitPrepareData } from '@/entities/submitCode/submission/model/query/submitCode.query.type';

/**웹소켓 연결 상태, 제출 상태 인터페이스 */
export interface IWebSocketStatus {
  isConnected: boolean;
  isSubmitted: boolean;
}

//웹소켓 메시지로 받는 results type - destination(/testcase)
export interface IProblemStompResult {
  testcaseId: number;
  isPassed: boolean;
  actualOutput: string;
  executionTime: number;
  memoryUsage: number;
  message: string;
}

//웹소켓 메시지로 받는 finalResult type - destination(/final)
export interface IProblemStompFinalResult {
  totalCount: number;
  passedCount: number;
  isCorrect: boolean;
  message: string;
}

/** setter 키 타입 */
type MessageKey = 'results' | 'totalResult' | 'error';
type StatusKey = 'isConnected' | 'isSubmitted';

/** 스토어 초기 값 */
export interface IInitialState {
  webSocketStatus: IWebSocketStatus;
  submitPrepareData: ISubmitPrepareData;
  results: IProblemStompResult[] | [];
  totalResult: IProblemStompFinalResult | null;
  error?: unknown | null;
}

/** 스토어 액션 인터페이스 */
interface IMessageInitialAction {
  actions: {
    setPrepareData: (data: ISubmitPrepareData) => void;
    setStatus: (key: StatusKey, status: boolean) => void;
    setResults: (key: MessageKey, message: unknown) => void;
    clearResults: () => void;
    clearStore: () => void;
  };
}

export const INITIAL_STATE: IInitialState = {
  webSocketStatus: {
    isConnected: false,
    isSubmitted: false,
  },
  submitPrepareData: {
    sessionKey: null,
    testcaseIds: null,
  },
  results: [],
  totalResult: null,
  error: null,
};

/** 인증 스토어 타입 */
export type IProblemWebSocketStore = IInitialState & IMessageInitialAction & IWebSocketStatus;
