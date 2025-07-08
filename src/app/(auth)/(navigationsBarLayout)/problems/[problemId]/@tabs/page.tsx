import { DetailProblem, Discussions, getDetailProblem, getDiscussions } from '@/features/problem';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
  searchParams: Promise<{ discussion: boolean }>;
}

export default async function ProblemPage({ params, searchParams }: IProblemPageProps) {
  const problemId = (await params).problemId;
  const isDiscussion = (await searchParams).discussion;
  const detailProblem = await getDetailProblem(problemId);
  const discussions = await getDiscussions(problemId);

  if (!detailProblem) {
    console.error('문제를 불러오는 데 실패했습니다.');
    return <div>문제를 불러오는 데 실패했습니다.</div>;
  }

  if (!discussions) {
    return;
  }
  return (
    <div className="w-full h-full">
      {!isDiscussion ? (
        <DetailProblem detailProblem={detailProblem} />
      ) : (
        <Discussions
          detailProblem={detailProblem}
          discussions={discussions}
          problemId={problemId}
        />
      )}
    </div>
  );
}
