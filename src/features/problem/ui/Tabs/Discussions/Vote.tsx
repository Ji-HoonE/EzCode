'use client';

import {
  IDiscussionContentResponse,
  TVoteStatus,
} from '@/features/problem/types/discussion.response.data.type';
import { useVoteStatusMutation } from '@/query/discussions';
import DownVoteIcon from '@/shared/ui/icons/vote-icons/DownVoteIcon';
import UpVoteIcon from '@/shared/ui/icons/vote-icons/UpVoteIcon';
import { useEffect, useState } from 'react';

interface IDiscussionVoteProps {
  content: IDiscussionContentResponse;
}
export default function Vote({ content }: IDiscussionVoteProps) {
  const [voteStatus, setVoteStatus] = useState<TVoteStatus>(content.voteStatus);
  const [voteCount, setVoteCount] = useState({
    upvoteCount: content.upvoteCount,
    downvoteCount: content.downvoteCount,
  });
  const { problemId, discussionId } = content;
  const { mutateAsync, data } = useVoteStatusMutation(String(problemId), discussionId);

  const changeVoteStatus = (iconType: TVoteStatus) => {
    if (iconType === voteStatus) {
      setVoteStatus('NONE');
      mutateAsync({ voteType: 'NONE' });
    }
    if (iconType !== voteStatus) {
      setVoteStatus(iconType);
      mutateAsync({ voteType: iconType });
    }
  };

  useEffect(() => {
    if (data && data.result) {
      setVoteCount({
        downvoteCount: data.result.downvoteCount,
        upvoteCount: data.result.upvoteCount,
      });
    }
  }, [data?.success]);

  return (
    <div className="flex items-center">
      <UpVoteIcon
        status={voteStatus}
        onClick={() => {
          changeVoteStatus('UP');
        }}
      />
      {voteCount.upvoteCount}
      <DownVoteIcon
        status={voteStatus}
        onClick={() => {
          changeVoteStatus('DOWN');
        }}
      />
      {voteCount.downvoteCount}
    </div>
  );
}
