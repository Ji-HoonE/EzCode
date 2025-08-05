import { ProblemId } from '@/shared';
import { useState } from 'react';
import ReplyForm from './ReplyForm';
import { IReply, useDeleteReplyMutation } from '@/entities/discussions';
import DiscussionFooter from '../../DiscussionFooter';
import UserProfile from '@/shared/ui/userProfile';

interface INestedReplyProps {
  nestedReply: IReply;
  problemId: ProblemId;
}
export default function NestedReply({ nestedReply, problemId }: INestedReplyProps) {
  const [isEdit, setIsEdit] = useState(false);
  const { discussionId, replyId, parentReplyId } = nestedReply;

  const { mutateAsync: remove } = useDeleteReplyMutation(problemId, discussionId, replyId, [
    'nestedReplies',
    problemId,
    discussionId,
  ]);

  return (
    <div className="flex flex-col">
      <div>
        <div className="bg-background rounded-[14px] p-3 flex flex-col gap-2">
          <UserProfile
            profileImageUrl={nestedReply.userInfo.profileImageUrl}
            nickname={nestedReply.userInfo.nickname}
          />
          {!isEdit ? (
            <>
              <p className="text-[#ccc] text-xs mb-2">{nestedReply.content}</p>
              <DiscussionFooter
                content={nestedReply}
                problemId={problemId}
                replyId={nestedReply.replyId}
                onDelete={() => remove()}
                onEdit={() => setIsEdit(true)}
              />
            </>
          ) : (
            <ReplyForm
              problemId={problemId}
              discussionId={discussionId}
              mode="edit"
              parentReplyId={parentReplyId}
              initialValue={nestedReply.content}
              onClick={() => setIsEdit(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
