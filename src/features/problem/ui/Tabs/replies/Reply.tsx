import { IReply } from '@/query/discussions/replies/replies.query.types';
import Vote from '../Discussions/Vote';
import { Button } from '@/components/ui/button';
import { ProblemId } from '@/shared';
import { ChangeEvent, useState } from 'react';
import {
  useDeleteReplyMutation,
  useEditReplyMutation,
} from '@/query/discussions/replies/replies.mutation';
import { BouncingDots } from '@/shared/ui/loading-indicators';
import { QueryClient } from '@tanstack/react-query';
import ShowChildReplies from '../Discussions/ShowChildReplies';
import NestedReplies from '../nestedReplies';

interface IReplyProps {
  reply: IReply;
  problemId: ProblemId;
}
export default function Reply({ reply, problemId }: IReplyProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentValue, setCurrentValue] = useState(reply.content);
  const [isNestedRepliesOpen, setIsNestedRepliesOpen] = useState(false);

  const { mutateAsync: editReplyMutation } = useEditReplyMutation(
    problemId,
    reply.discussionId,
    reply.replyId
  );
  const { mutateAsync: deleteReplyMutation, isPending: isDeletePending } = useDeleteReplyMutation(
    problemId,
    reply.discussionId,
    reply.replyId,
    ['replies', problemId, reply.discussionId]
  );

  const handleClickEditButton = () => {
    if (isEdit) {
      editReplyMutation({ content: currentValue });
    }
    setIsEdit((prev) => !prev);
  };

  const optimisticVote = (queryClient: QueryClient) => {
    queryClient.invalidateQueries({ queryKey: ['replies', problemId, reply.discussionId] });
  };

  return (
    <div className="flex flex-col">
      <div>
        {!isEdit ? (
          <div>
            <h3>닉네임: {reply.userInfo.nickname}</h3>
            <p>{currentValue}</p>
            <div className="flex items-center">
              <Vote
                problemId={problemId}
                content={reply}
                replyId={reply.replyId}
                onSuccess={optimisticVote}
              />
              <ShowChildReplies
                onClick={() => {
                  setIsNestedRepliesOpen((prev) => !prev);
                }}
                replyCount={reply.childReplyCount}
              />
            </div>
          </div>
        ) : (
          <input
            value={currentValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCurrentValue(e.target.value);
            }}
          />
        )}
        <Button className="bg-gray-400" onClick={handleClickEditButton}>
          {isEdit ? '완료' : '수정'}
        </Button>
        <Button className="bg-gray-400" onClick={() => deleteReplyMutation()}>
          {isDeletePending ? <BouncingDots /> : '삭제'}
        </Button>
      </div>
      <div className="pl-8">
        {isNestedRepliesOpen && (
          <NestedReplies
            problemId={problemId}
            discussionId={reply.discussionId}
            parentReplyId={reply.replyId}
          />
        )}
      </div>
    </div>
  );
}
