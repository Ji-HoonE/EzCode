'use client';
import { ProblemId } from '@/shared';
import { Spinner } from '@/shared/ui/loading-indicators';
import Reply from './Reply';
import ReplyForm from './ReplyForm';
import { useRepliesQuery } from '@/entities/discussions';
import useProblemWebSocketStore from '@/features/submitCode/submission/model/useProblemWebSocketStore';
import ProtectedBlurBox from '@/shared/ui/LoginRequiredUi/ProtectedBlurBox';

interface RepliesProps {
  problemId: ProblemId;
  discussionId: number;
}
export default function Replies({ problemId, discussionId }: RepliesProps) {
  const queryResult = useRepliesQuery(problemId, discussionId);
  const { token } = useProblemWebSocketStore();
  const repliesData = queryResult?.data?.result;
  const isPending = queryResult?.isPending;

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full h-full relative border-t border-primary pt-4 space-y-4 mt-4">
      {!token && <ProtectedBlurBox />}
      <div className="ml-4 flex flex-col gap-4">
        <ReplyForm
          problemId={problemId}
          discussionId={discussionId}
          parentReplyId={null}
          mode="create"
          initialValue=""
        />
        <div className="flex flex-col gap-2">
          {repliesData?.content.map((reply) => {
            return <Reply key={reply.replyId} reply={reply} problemId={problemId} />;
          })}
        </div>
      </div>
    </div>
  );
}
