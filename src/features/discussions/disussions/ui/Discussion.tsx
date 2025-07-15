'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ShowChildReplies from '../../reply/ui/ShowChildReplies';
import DiscussionForm from './DiscussionForm';
import {
  TDiscussionContentMutationResponse,
  useDeleteDiscussionContent,
} from '@/entities/discussions';
import { Vote } from '../../vote';
import Replies from '../../reply/ui/Replies';

interface IDiscussionContentProps {
  discussion: TDiscussionContentMutationResponse;
}

export default function Discussion({ discussion }: IDiscussionContentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const { userInfo, replyCount, problemId, discussionId, content } = discussion;

  const { mutateAsync: deleteMutate } = useDeleteDiscussionContent(
    String(discussion.problemId),
    discussion.discussionId
  );

  return (
    <>
      <div className="w-full flex flex-col">
        <div>
          {isEdit ? (
            <DiscussionForm
              problemId={String(problemId)}
              mode="edit"
              discussion={discussion}
              changeEditMode={(status) => setIsEdit(status)}
            />
          ) : (
            <div>
              <h3>닉네임: {userInfo.nickname}</h3>
              <p>{content}</p>
              <div className="flex items-center">
                <Vote content={discussion} problemId={String(problemId)} />
                <ShowChildReplies
                  onClick={() => {
                    setIsRepliesOpen((prev) => !prev);
                  }}
                  replyCount={replyCount}
                />
              </div>
              {discussion.isAuthor && (
                <>
                  <Button
                    onClick={() => {
                      deleteMutate();
                    }}
                  >
                    삭제
                  </Button>
                  <Button onClick={() => setIsEdit(true)}>{isEdit ? '완료' : '수정'}</Button>
                </>
              )}
            </div>
          )}
        </div>
        {isRepliesOpen && <Replies problemId={String(problemId)} discussionId={discussionId} />}
      </div>
    </>
  );
}
