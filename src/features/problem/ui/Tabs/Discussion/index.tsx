import { IDiscussionResponse } from '../../../types/discussion.response.data.type';
import { IDetailProblemResponse } from '../../../types/problem.response.data.type';
import DetailProblem from '../DetailProblem';
import DiscussionContent from './DiscussionContent';

interface IDiscussionProps {
  detailProblem: IDetailProblemResponse;
  discussions: IDiscussionResponse | undefined;
}

export default function Discussion({ detailProblem, discussions }: IDiscussionProps) {
  if (!discussions) {
    return <div>토론 목록을 불러오는데 실패했습니다.</div>;
  }
  return (
    <div className="relative">
      <div className="absolute top-0">
        <DetailProblem detailProblem={detailProblem} />
      </div>
      {discussions.content.length < 1 ? (
        <div>아직 토론이 없습니다.</div>
      ) : (
        discussions.content.map((content) => {
          return <DiscussionContent discussionContent={content} />;
        })
      )}
    </div>
  );
}
