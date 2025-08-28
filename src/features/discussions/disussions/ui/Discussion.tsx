'use client';
import { useState } from 'react';
import DiscussionForm from './DiscussionForm';
import { useDeleteDiscussionContent } from '@/entities/discussions';
import Replies from '../../reply/ui/Replies';
import { TDiscussionContentMutationResponse } from '@/entities/discussions/discussions/model/mutation/discussions.types';
import { LANGUAGE } from '@/shared/types/problem.type';
import DiscussionFooter from '../../DiscussionFooter';
import UserProfile from '@/shared/ui/userProfile';
import DeleteConfirmModal from '@/shared/ui/modals/deleteConfirmModal/DeleteConfirmModal';

interface IDiscussionContentProps {
  discussion: TDiscussionContentMutationResponse;
  id: string;
}

export default function Discussion({ discussion, id }: IDiscussionContentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { userInfo, replyCount, problemId, discussionId, content, languageId } = discussion;

  const { mutateAsync: deleteMutate } = useDeleteDiscussionContent(
    String(discussion.problemId),
    discussion.discussionId
  );

  return (
    <div
      className="bg-secondary-background rounded-[10px] p-6 shadow-lg w-full flex flex-col"
      id={id}
    >
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <UserProfile profileImageUrl={userInfo.profileImageUrl} nickname={userInfo.nickname} />
          <span className="text-[#888] text-sm ml-2">{LANGUAGE[languageId]}</span>
        </div>
        {!isEdit ? (
          <>
            <p className="text-[#ccc] leading-relaxed">{content}</p>
            <DiscussionFooter
              content={discussion}
              problemId={String(problemId)}
              setChildRepliesOpen={() => {
                setIsRepliesOpen((prev) => !prev);
              }}
              replyCount={replyCount}
              onDelete={() => setIsDeleteModalOpen(true)}
              onEdit={() => setIsEdit(true)}
            />
          </>
        ) : (
          <DiscussionForm
            problemId={String(problemId)}
            mode="edit"
            discussion={discussion}
            changeEditMode={(status) => setIsEdit(status)}
          />
        )}
      </div>

      {isRepliesOpen && <Replies problemId={String(problemId)} discussionId={discussionId} />}
      <DeleteConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteMutate}
        title="이 토론을 삭제하시겠어요?"
      />
    </div>
  );
}
