'use client';
import { useState } from 'react';
import DiscussionForm from './DiscussionForm';
import { useDeleteDiscussionContent } from '@/entities/discussions';
import Replies from '../../reply/ui/Replies';
import { TDiscussionContentMutationResponse } from '@/entities/discussions/discussions/model/mutation/discussions.types';
import { LANGUAGE } from '@/shared/types/problem.type';
import DiscussionFooter from '../../DiscussionFooter';
import UserProfile from '@/shared/ui/userProfile';

interface IDiscussionContentProps {
  discussion: TDiscussionContentMutationResponse;
}

export default function Discussion({ discussion }: IDiscussionContentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const { userInfo, replyCount, problemId, discussionId, content, languageId } = discussion;

  const { mutateAsync: deleteMutate } = useDeleteDiscussionContent(
    String(discussion.problemId),
    discussion.discussionId
  );

  return (
    <div className="bg-secondary-background rounded-[10px] p-6 shadow-lg w-full flex flex-col">
      {isEdit ? (
        <DiscussionForm
          problemId={String(problemId)}
          mode="edit"
          discussion={discussion}
          changeEditMode={(status) => setIsEdit(status)}
        />
      ) : (
        <div className="w-full flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <UserProfile profileImageUrl={userInfo.profileImageUrl} nickname={userInfo.nickname} />
            <span className="text-[#888] text-sm ml-2">{LANGUAGE[languageId]}</span>
          </div>
          <p className="text-[#ccc] leading-relaxed">{content}</p>
          <DiscussionFooter
            content={discussion}
            problemId={String(problemId)}
            setChildRepliesOpen={() => {
              setIsRepliesOpen((prev) => !prev);
            }}
            replyCount={replyCount}
            onDelete={() => deleteMutate()}
            onEdit={() => setIsEdit(true)}
          />
        </div>
      )}
      {isRepliesOpen && <Replies problemId={String(problemId)} discussionId={discussionId} />}
    </div>
  );
}
