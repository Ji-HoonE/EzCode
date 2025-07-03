//웹소켓 메시지로 받는 init type - destination(/init)

interface IProblemStompInitCase {
  id: number;
  problemId: number;
  input: string;
  output: string;
}

//웹소켓 메시지로 받는 result type - destination(/testcase)
export interface IProblemStompResult {
  actualOutput: string;
  executionTime: number;
  isPassed: boolean;
  memoryUsage: number;
  message: string;
  seqId: number;
}

//웹소켓 메시지로 받는 finalResult type - destination(/final)
interface IProblemStompFinalResult {
  totalCount: number;
  passedCount: number;
  isCorrect: boolean;
  message: string;
}

/** 메시지 키 타입 */
type MessageKey = 'initCases' | 'results' | 'finalResult' | 'error' | 'git-status';

/** 스토어 상태 인터페이스 */
export interface IMessageInitialState {
  isSubmitted: boolean;
  initCases: IProblemStompInitCase[] | null;
  results: IProblemStompResult[] | [];
  finalResult: IProblemStompFinalResult | null;
  error?: unknown | null;
  gitStatus?: unknown | null;
}

/** 스토어 액션 인터페이스 */
interface IMessageInitialAction {
  actions: {
    setStatus: (status: boolean) => void;
    setMessage: (key: MessageKey, message: unknown) => void;
    clearMessages: () => void;
  };
}

/** 인증 스토어 타입 */
export type IProblemWebSocketStore = IMessageInitialState & IMessageInitialAction;
