import Discussions from '@/features/discussions/disussions/ui/Discussions';
import { DetailProblem, getDetailProblem } from '@/entities/problem';
import CollapsibleProblem from '@/entities/problem/ui/CollapsibleProblem';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
  searchParams: Promise<{ discussion: boolean }>;
}

export default async function ProblemPage({ params, searchParams }: IProblemPageProps) {
  const problemId = (await params).problemId;
  const isDiscussion = (await searchParams).discussion;
  const detailProblem = await getDetailProblem(problemId);

  if (!detailProblem) {
    console.error('문제를 불러오는 데 실패했습니다.');
    return <div>문제를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="w-full h-full overflow-scroll">
      {!isDiscussion ? (
        <DetailProblem detailProblem={detailProblem} />
      ) : (
        <div className="flex flex-col gap-[10px]">
          <CollapsibleProblem detailProblem={detailProblem} />
          <Discussions problemId={problemId} />
        </div>
      )}
    </div>
  );
}
