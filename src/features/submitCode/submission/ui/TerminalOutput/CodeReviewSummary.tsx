import { Button } from '@/components/ui/button';
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
    <div className="flex flex-col">
      <p>AI 코드 리뷰를 받으시겠습니까? 남은 토큰 수는 {tokenCount}개 입니다.</p>
      <Button onClick={submitCode}>코드리뷰</Button>
      {isSubmittedReview && (
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
      )}
    </div>
  );
}
