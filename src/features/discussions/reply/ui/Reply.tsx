import Vote from '../../vote/ui/Vote';
import { Button } from '@/components/ui/button';
import { ProblemId } from '@/shared';
import { useState } from 'react';
import { BouncingDots } from '@/shared/ui/loading-indicators';
import NestedReplies from './NestedReplies';
import ReplyForm from './ReplyForm';
import ShowChildReplies from './ShowChildReplies';
import { IReply, useDeleteReplyMutation } from '@/entities/discussions';

interface IReplyProps {
  reply: IReply;
  problemId: ProblemId;
}
export default function Reply({ reply, problemId }: IReplyProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNestedRepliesOpen, setIsNestedRepliesOpen] = useState(false);

  const { content, discussionId, replyId, userInfo, childReplyCount } = reply;

  const { mutateAsync: remove, isPending } = useDeleteReplyMutation(
    problemId,
    discussionId,
    replyId,
    ['replies', problemId, discussionId]
  );

  return (
    <div className="flex flex-col">
      <div>
        {!isEdit ? (
          <div>
            <h3>닉네임: {userInfo.nickname}</h3>
            <p>{content}</p>
            <div className="flex items-center">
              <Vote problemId={problemId} content={reply} replyId={replyId} />
              <ShowChildReplies
                onClick={() => {
                  setIsNestedRepliesOpen((prev) => !prev);
                }}
                replyCount={childReplyCount}
              />
            </div>
            <Button className="bg-gray-400" onClick={() => setIsEdit(true)}>
              수정
            </Button>
            <Button className="bg-gray-400" onClick={() => remove()}>
              {isPending ? <BouncingDots /> : '삭제'}
            </Button>
            <div className="pl-8">
              {isNestedRepliesOpen && (
                <NestedReplies
                  problemId={problemId}
                  discussionId={discussionId}
                  parentReplyId={replyId}
                />
              )}
            </div>
          </div>
        ) : (
          <ReplyForm
            problemId={problemId}
            discussionId={discussionId}
            parentReplyId={null}
            mode="create"
            initialValue=""
            onClick={() => setIsEdit(false)}
          />
        )}
      </div>
    </div>
  );
}
