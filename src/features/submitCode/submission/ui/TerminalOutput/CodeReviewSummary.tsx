import { ProblemId } from '@/shared';
import { ISourceCode } from '@/entities/submitCode/submission/model/mutation/submitCode.mutation.type';
import useSubmitForReview from '../../hooks/useSubmitForReview';
import { BouncingDots } from '@/shared/ui/loading-indicators';
import useProblemWebSocketStore from '../../model/useProblemWebSocketStore';
import FormatMarkdown from '@/shared/ui/FormatMarkdown';

interface ICodeReviewSummaryProps {
  problemId: ProblemId;
  sourceCodeData: ISourceCode;
}
export default function CodeReviewSummary({ problemId, sourceCodeData }: ICodeReviewSummaryProps) {
  const { tokenCount, submitForReview, codeReview, isSubmittedReview } =
    useSubmitForReview(problemId);
  const { isSubmitted } = useProblemWebSocketStore();

  if (!isSubmitted) {
    return <div className="text-[#ccc] text-sm">코드를 먼저 실행해주세요</div>;
  }
  return (
    <div className="flex flex-col h-full">
      {isSubmittedReview ? (
        <div className="flex flex-col gap-2">
          {codeReview ? (
            <div>
              <FormatMarkdown markdown={codeReview} />
            </div>
          ) : (
            <div className="w-full rounded-xl bg-background items-center flex flex-col p-3">
              <div className="flex gap-3 items-center">
                코드리뷰 받는중
                <BouncingDots />
              </div>
              <p className="text-sm text-gray-500">최대 1분 정도 소요될 수 있습니다.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center flex-col gap-2">
          <div className="text-[#ccc] text-xl">
            AI 코드 리뷰를 받으시겠습니까? 남은 토큰 수는
            <span className="text-secondary"> {tokenCount} </span>개 입니다.
          </div>
          <button
            onClick={() => submitForReview(sourceCodeData)}
            className="bg-primary hover:bg-hover-primary active:bg-active active:scale-[0.98] px-4 py-2 rounded-[10px] transition-all"
          >
            AI 리뷰 받기
          </button>
        </div>
      )}
    </div>
  );
}
