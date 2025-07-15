import { Button } from '@/components/ui/button';
import { ProblemId } from '@/shared';
import { BouncingDots } from '@/shared/ui/loading-indicators';
import { useState } from 'react';
import Vote from '../../vote/ui/Vote';
import { IReply, useDeleteReplyMutation } from '@/entities/discussionReplies';
import ReplyForm from './ReplyForm';

interface INestedReplyProps {
  nestedReply: IReply;
  problemId: ProblemId;
}
export default function NestedReply({ nestedReply, problemId }: INestedReplyProps) {
  const [isEdit, setIsEdit] = useState(false);
  const { discussionId, replyId, parentReplyId } = nestedReply;

  const { mutateAsync: remove, isPending } = useDeleteReplyMutation(
    problemId,
    discussionId,
    replyId,
    ['nestedReplies', problemId, discussionId]
  );

  return (
    <div className="flex flex-col">
      <div>
        {!isEdit ? (
          <div>
            <h3>닉네임: {nestedReply.userInfo.nickname}</h3>
            <p>{nestedReply.content}</p>
            <div className="flex items-center">
              <Vote problemId={problemId} content={nestedReply} replyId={nestedReply.replyId} />
            </div>
            <Button className="bg-gray-400" onClick={() => setIsEdit(true)}>
              수정
            </Button>
            <Button className="bg-gray-400" onClick={() => remove()}>
              {isPending ? <BouncingDots /> : '삭제'}
            </Button>
          </div>
        ) : (
          <ReplyForm
            problemId={problemId}
            discussionId={discussionId}
            mode="create"
            parentReplyId={parentReplyId}
            initialValue={nestedReply.content}
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>
    </div>
  );
}
