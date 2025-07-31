import { ProblemId } from '@/shared';
import { useState } from 'react';
import NestedReplies from './NestedReplies';
import ReplyForm from './ReplyForm';
import { IReply, useDeleteReplyMutation } from '@/entities/discussions';
import UserImage from '@/shared/ui/userProfile/UserImage';
import DiscussionFooter from '../../DiscussionFooter';

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
        {!isEdit ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <UserImage profileImageUrl={userInfo.profileImageUrl} />
              <span className="font-medium text-secondary text-sm">{userInfo.nickname}</span>
            </div>
            <p className="text-[#ccc] text-sm mb-2 ml-8">{content}</p>
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
          </div>
        ) : (
          <ReplyForm
            problemId={problemId}
            discussionId={discussionId}
            parentReplyId={null}
            mode="create"
            initialValue={content}
            onClick={() => setIsEdit(false)}
          />
        )}
      </div>
    </div>
  );
}
