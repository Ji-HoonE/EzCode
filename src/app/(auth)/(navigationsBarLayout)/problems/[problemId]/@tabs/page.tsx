import Discussions from '@/features/discussions/disussions/ui/Discussions';
import { DetailProblem, getDetailProblem } from '@/features/problem';

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
    <div className="w-full h-full">
      {!isDiscussion ? (
        <DetailProblem detailProblem={detailProblem} />
      ) : (
        <div className="flex flex-col gap-[10px]">
          <div className=" top-0 bg-gray-400 h-[200px] overflow-scroll">
            <DetailProblem detailProblem={detailProblem} />
          </div>
          <Discussions problemId={problemId} />
        </div>
      )}
    </div>
  );
}
