import { Button } from '@/components/ui/button';
import useCodeReviewStore from '../../model/codeReviewStore';
import useSubmissions from '../../hooks/useSubmissions';
import { ProblemId } from '@/shared';
import { IProblemRequestData } from '@/query/problemSubmission/problems.submission.interface';

interface ICodeReviewSummaryProps {
  problemId: ProblemId;
  sourceCodeData: IProblemRequestData;
}
export default function CodeReviewSummary({ problemId, sourceCodeData }: ICodeReviewSummaryProps) {
  const { isCorrect } = useCodeReviewStore();
  const { codeReviewContent } = useCodeReviewStore();

  const { submitCodeForReview } = useSubmissions(problemId);
  return (
    <div className="flex flex-col">
      <p>AI 코드 리뷰를 받으시겠습니까? 남은 토큰 수는 10개 입니다.</p>
      <Button onClick={() => submitCodeForReview({ isCorrect, ...sourceCodeData })}>
        코드리뷰
      </Button>
      <div>
        코드리뷰:
        {codeReviewContent && (
          <>
            {codeReviewContent.map((review) => {
              return (
                <div className="flex flex-col" key={review.key}>
                  <h3>{review.key}</h3>
                  <p>{review.content}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
