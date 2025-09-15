'use client';

import { IReply, TVoteStatus, useVoteStatusMutation } from '@/entities/discussions';
import { IDiscussionContentResponse } from '@/entities/discussions/discussions/model/query/discussion.query.type';
import { ProblemId } from '@/shared';
import DownVoteIcon from '@/shared/ui/icons/vote-icons/DownVoteIcon';
import UpVoteIcon from '@/shared/ui/icons/vote-icons/UpVoteIcon';

import { useEffect, useState } from 'react';

interface IVoteProps {
  content: IDiscussionContentResponse | IReply;
  problemId?: ProblemId;
  id: number;
  type: 'discussion' | 'reply';
}

export default function Vote({ content, problemId, id, type }: IVoteProps) {
  const [voteStatus, setVoteStatus] = useState<TVoteStatus>(content.voteStatus);
  const [voteCount, setVoteCount] = useState({
    upvoteCount: content.upvoteCount,
    downvoteCount: content.downvoteCount,
  });
  const discussionId = type === 'discussion' ? id : content.discussionId;

  const { mutateAsync, data } = useVoteStatusMutation(String(problemId), discussionId, id, type);

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
    <>
      <div className="flex items-center gap-1">
        <UpVoteIcon
          status={voteStatus}
          onClick={() => {
            changeVoteStatus('UP');
          }}
        />
        {voteCount.upvoteCount}
      </div>
      <div className="flex items-center gap-1">
        <DownVoteIcon
          status={voteStatus}
          onClick={() => {
            changeVoteStatus('DOWN');
          }}
        />
        {voteCount.downvoteCount}
      </div>
    </>
  );
}
