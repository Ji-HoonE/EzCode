'use client';
import { ProblemId } from '@/shared';
import { Spinner } from '@/shared/ui/loading-indicators';
import Reply from './Reply';
import ReplyForm from './ReplyForm';
import { useRepliesQuery } from '@/entities/discussions';

interface RepliesProps {
  problemId: ProblemId;
  discussionId: number;
}
export default function Replies({ problemId, discussionId }: RepliesProps) {
  const queryResult = useRepliesQuery(problemId, discussionId);

  const repliesData = queryResult?.data?.result;
  const isPending = queryResult?.isPending;

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className="pl-8">
      <div>
        <ReplyForm
          problemId={problemId}
          discussionId={discussionId}
          parentReplyId={null}
          mode="create"
          initialValue=""
        />
      </div>
      {repliesData?.empty ? (
        <p>아직 댓글이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {repliesData?.content.map((reply) => {
            return <Reply key={reply.replyId} reply={reply} problemId={problemId} />;
          })}
        </div>
      )}
    </div>
  );
}
