'use client';
import { Button } from '@/components/ui/button';
import { IDiscussionContentResponse } from '@/features/problem/types/discussion.response.data.type';
import { useEditDiscussionContent } from '@/query/discussions/discussions';
import { ChangeEvent, useEffect, useState } from 'react';

interface IDiscussionContentProps {
  discussionContent: IDiscussionContentResponse;
}

/**@todo : 백엔드에 languageId 값 요청  */

export default function DiscussionContent({ discussionContent }: IDiscussionContentProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [currentContent, setCurrentContent] = useState(discussionContent.content);

  const { userInfo } = discussionContent;
  const { mutateAsync, data } = useEditDiscussionContent(
    String(discussionContent.problemId),
    discussionContent.discussionId
  );

  useEffect(() => {
    if (data && data.data.success) {
      setIsEdit(false);
    }
  }, [data?.data.success]);

  return (
    <div className="w-full flex">
      <div>
        <h3>닉네임: {userInfo.nickname}</h3>
        {isEdit ? (
          <textarea
            value={currentContent}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCurrentContent(e.target.value)}
            className="border-1 rounded-xl"
          />
        ) : (
          <p>{currentContent}</p>
        )}
      </div>
      <Button onClick={() => {}}>삭제</Button>
      <Button
        onClick={() => {
          isEdit ? mutateAsync({ languageId: 4, content: currentContent }) : setIsEdit(true); // languageId를 받아올 방법이 없음, 백엔드측에 요청후 수정 예정
        }}
      >
        {isEdit ? '완료' : '수정'}
      </Button>
    </div>
  );
}
