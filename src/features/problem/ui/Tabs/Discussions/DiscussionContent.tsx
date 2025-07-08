'use client';
import { Button } from '@/components/ui/button';
import { IDiscussionContentResponse } from '@/features/problem/types/discussion.response.data.type';
import {
  useDeleteDiscussionContent,
  useEditDiscussionContent,
} from '@/query/discussions/discussions.mutations';
import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Replies from './Replies';
import Vote from './Vote';

interface IDiscussionContentProps {
  discussionContent: IDiscussionContentResponse;
}

/**@todo : 백엔드에 languageId 값 요청  */

export default function DiscussionContent({ discussionContent }: IDiscussionContentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(discussionContent.content);

  const { userInfo, replyCount, problemId, discussionId } = discussionContent;

  const { mutateAsync: editMutate, data: editResponse } = useEditDiscussionContent(
    String(discussionContent.problemId),
    discussionContent.discussionId
  );
  const { mutateAsync: deleteMutate, data: deleteResponse } = useDeleteDiscussionContent(
    String(discussionContent.problemId),
    discussionContent.discussionId
  );

  useEffect(() => {
    if (editResponse && editResponse.data.success) {
      setIsEdit(false);
    }
    if (deleteResponse && deleteResponse.data.success) {
      setIsDelete(true);
    }
  }, [editResponse?.data.success, deleteResponse?.data.success]);

  return (
    <>
      {!isDelete && (
        <div className="w-full flex flex-col">
          <div>
            <div>
              <h3>닉네임: {userInfo.nickname}</h3>
              {isEdit ? (
                <textarea
                  value={currentContent}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setCurrentContent(e.target.value)
                  }
                  className="border-1 rounded-xl"
                />
              ) : (
                <p>{currentContent}</p>
              )}
              <div className="flex items-center">
                <Vote content={discussionContent} />
                <button
                  className="flex items-center"
                  onClick={() => setIsRepliesOpen((prev) => !prev)}
                >
                  <Image
                    alt="댓글보기 아이콘"
                    src="/icons/discussion/replies.icon.svg"
                    width={17}
                    height={17}
                  />
                  <p>답글 {replyCount}개</p>
                </button>
              </div>
            </div>
            <Button
              onClick={() => {
                deleteMutate();
              }}
            >
              삭제
            </Button>
            <Button
              onClick={() => {
                isEdit ? editMutate({ languageId: 4, content: currentContent }) : setIsEdit(true); // languageId를 받아올 방법이 없음, 백엔드측에 요청후 수정 예정
              }}
            >
              {isEdit ? '완료' : '수정'}
            </Button>
          </div>
          {isRepliesOpen && (
            <Replies
              isOpen={isRepliesOpen}
              problemId={String(problemId)}
              discussionId={discussionId}
            />
          )}
        </div>
      )}
    </>
  );
}
