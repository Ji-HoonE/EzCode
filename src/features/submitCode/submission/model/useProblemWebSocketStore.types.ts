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
interface IProblemStompFinalResult {
  totalCount: number;
  passedCount: number;
  isCorrect: boolean;
  message: string;
}

/** 메시지 키 타입 */
type MessageKey = 'results' | 'totalResult' | 'error' | 'git-status';

/** 스토어 상태 인터페이스 */
export interface IMessageInitialState {
  sessionKey: string;
  isConnected: boolean;
  results: IProblemStompResult[] | [];
  totalResult: IProblemStompFinalResult | null;
  error?: unknown | null;
  gitStatus?: unknown | null;
}

/** 스토어 액션 인터페이스 */
interface IMessageInitialAction {
  actions: {
    setSessionKey: (key: string) => void;
    setStatus: (status: boolean) => void;
    setMessage: (key: MessageKey, message: unknown) => void;
    clearMessages: () => void;
    clearResults: () => void;
  };
}

/** 인증 스토어 타입 */
export type IProblemWebSocketStore = IMessageInitialState & IMessageInitialAction;
