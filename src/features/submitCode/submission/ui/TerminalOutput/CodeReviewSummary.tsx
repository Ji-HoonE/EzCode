import { ProblemId } from '@/shared';
import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import useSubmitForReview from '../../hooks/useSubmitForReview';
import { BouncingDots } from '@/shared/ui/loading-indicators';
import useProblemWebSocketStore from '../../model/useProblemWebSocketStore';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/api/constants/api.constants';

interface ICodeReviewSummaryProps {
  problemId: ProblemId;
  sourceCodeData: ISourceCode;
}
export default function CodeReviewSummary({ problemId, sourceCodeData }: ICodeReviewSummaryProps) {
  const router = useRouter();
  const { tokenCount, submitForReview, codeReview, isSubmittedReview } =
    useSubmitForReview(problemId);
  const { token } = useProblemWebSocketStore();

  const submitCode = () => {
    if (!token) return router.push(API_URL.AUTH.SIGN_IN);
    submitForReview(sourceCodeData);
  };
  return (
    <div className="flex flex-col h-full">
      {isSubmittedReview ? (
        <div>
          코드리뷰:
          {codeReview ? (
            <div>
              {codeReview.split('\n').map((line, idx) => (
                <p key={idx}>
                  {line.trim().startsWith('**') ? (
                    <strong>{line.replace(/\*\*/g, '')}</strong>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </div>
          ) : (
            <BouncingDots />
          )}
        </div>
      ) : (
        <div className="flex items-center flex-col gap-2">
          <div className="text-[#ccc] text-xl">
            AI 코드 리뷰를 받으시겠습니까? 남은 토큰 수는
            <span className="text-secondary"> {tokenCount} </span>개 입니다.
          </div>
          <button
            onClick={submitCode}
            className="bg-primary hover:bg-hover-primary active:bg-active active:scale-[0.98] px-4 py-2 rounded-[10px] transition-all"
          >
            AI 리뷰 받기
          </button>
        </div>
      )}
    </div>
  );
}
