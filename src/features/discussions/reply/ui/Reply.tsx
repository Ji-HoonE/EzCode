import { ProblemId } from '@/shared';
import { useState } from 'react';
import NestedReplies from './NestedReplies';
import ReplyForm from './ReplyForm';
import { IReply, useDeleteReplyMutation } from '@/entities/discussions';
import DiscussionFooter from '../../DiscussionFooter';
import UserProfile from '@/shared/ui/userProfile';

interface IReplyProps {
  reply: IReply;
  problemId: ProblemId;
}
export default function Reply({ reply, problemId }: IReplyProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNestedRepliesOpen, setIsNestedRepliesOpen] = useState(false);

  const { content, discussionId, replyId, userInfo, childReplyCount } = reply;

  const { mutateAsync: remove } = useDeleteReplyMutation(problemId, discussionId, replyId, [
    'replies',
    problemId,
    discussionId,
  ]);

  return (
    <div className="flex flex-col">
      <div>
        <div className="flex flex-col gap-2">
          <UserProfile profileImageUrl={userInfo.profileImageUrl} nickname={userInfo.nickname} />
          {!isEdit ? (
            <>
              <p className="text-[#ccc] text-sm ml-8">{content}</p>
              <DiscussionFooter
                content={reply}
                problemId={problemId}
                replyId={replyId}
                setChildRepliesOpen={() => {
                  setIsNestedRepliesOpen((prev) => !prev);
                }}
                replyCount={childReplyCount}
                onDelete={() => remove()}
                onEdit={() => setIsEdit(true)}
              />
              <div className="pl-8">
                {isNestedRepliesOpen && (
                  <NestedReplies
                    problemId={problemId}
                    discussionId={discussionId}
                    parentReplyId={replyId}
                  />
                )}
              </div>
            </>
          ) : (
            <ReplyForm
              problemId={problemId}
              discussionId={discussionId}
              parentReplyId={null}
              mode="edit"
              initialValue={content}
              onClick={() => setIsEdit(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
