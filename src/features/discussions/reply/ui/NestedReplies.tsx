import { Spinner } from '@/shared/ui/loading-indicators';
import ReplyForm from './ReplyForm';
import NestedReply from './NestedReply';
import { useNestedRepliesQuery } from '@/entities/discussions';

interface INestedReplies {
  problemId: string;
  discussionId: number;
  parentReplyId: number;
}
export default function NestedReplies({ problemId, discussionId, parentReplyId }: INestedReplies) {
  const { data, isPending } = useNestedRepliesQuery(problemId, discussionId, parentReplyId);

  const nestedReplies = data?.result.content;

  if (isPending) {
    return <Spinner />;
  }

  if (!nestedReplies) {
    return <div className="ml-2 mt-3 pl-4">댓글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="ml-2 mt-3 space-y-3 border-l-2 border-primary pl-4">
      <ReplyForm
        problemId={problemId}
        discussionId={discussionId}
        mode="create"
        initialValue=""
        parentReplyId={parentReplyId}
      />
      {nestedReplies.map((reply) => {
        return <NestedReply key={reply.replyId} nestedReply={reply} problemId={problemId} />;
      })}
    </div>
  );
}
