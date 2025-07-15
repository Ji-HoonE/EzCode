'use client';

import { IReply } from '@/entities/discussionReplies';
import { IDiscussionContentResponse } from '@/entities/discussions';
import { TVoteStatus, useVoteStatusMutation } from '@/entities/vote';
import { ProblemId } from '@/shared';
import DownVoteIcon from '@/shared/ui/icons/vote-icons/DownVoteIcon';
import UpVoteIcon from '@/shared/ui/icons/vote-icons/UpVoteIcon';

import { useEffect, useState } from 'react';

interface IVoteProps {
  content: IDiscussionContentResponse | IReply;
  problemId?: ProblemId;
  replyId?: number;
}

export default function Vote({ content, problemId, replyId }: IVoteProps) {
  const [voteStatus, setVoteStatus] = useState<TVoteStatus>(content.voteStatus);
  const [voteCount, setVoteCount] = useState({
    upvoteCount: content.upvoteCount,
    downvoteCount: content.downvoteCount,
  });

  const { discussionId } = content;
  const { mutateAsync, data } = useVoteStatusMutation(String(problemId), discussionId, replyId);

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
  }, [data]);

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
