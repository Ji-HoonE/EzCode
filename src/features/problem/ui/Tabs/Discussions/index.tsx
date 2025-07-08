'use client';
import { Button } from '@/components/ui/button';
import { IDiscussionResponse } from '../../../types/discussion.response.data.type';
import { IDetailProblemResponse } from '../../../types/problem.response.data.type';
import DetailProblem from '../DetailProblem';
import DiscussionContent from './DiscussionContent';
import { useCreateDiscussionContent } from '@/query/discussions/discussions';
import { ProblemId } from '@/shared';
import { ChangeEvent, useEffect, useState } from 'react';
import { DISCUSSION_CREATE_VALUE } from '@/query/discussions/initial.value';
import { IDiscussionContentMutationRequest } from '@/query/discussions/discussions.types';

interface IDiscussionProps {
  detailProblem: IDetailProblemResponse;
  discussions: IDiscussionResponse | undefined;
  problemId: ProblemId;
}

export default function Discussions({ detailProblem, discussions, problemId }: IDiscussionProps) {
  const [contentForm, setContentForm] =
    useState<IDiscussionContentMutationRequest>(DISCUSSION_CREATE_VALUE);
  const { mutateAsync, data } = useCreateDiscussionContent(problemId);

  if (!discussions) {
    return <div>토론 목록을 불러오는데 실패했습니다.</div>;
  }

  useEffect(() => {
    if (data) {
      discussions.content.push(...data.data.result.content);
      setContentForm((prev) => ({ ...prev, content: '' }));
    }
  }, [data]);

  return (
    <div className=" flex flex-col gap-[10px]">
      <div className=" top-0 bg-gray-400 h-[200px] overflow-scroll">
        <DetailProblem detailProblem={detailProblem} />
      </div>
      <div className="relative">
        <textarea
          className="border-1 w-full h-[100px]"
          value={contentForm.content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContentForm((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <Button className="absolute right-4 top-5" onClick={() => mutateAsync(contentForm)}>
          토론 생성
        </Button>
      </div>
      <div>
        {discussions.content.length < 1 ? (
          <div>아직 토론이 없습니다.</div>
        ) : (
          discussions.content.map((content) => {
            return <DiscussionContent discussionContent={content} key={content.discussionId} />;
          })
        )}
      </div>
    </div>
  );
}
