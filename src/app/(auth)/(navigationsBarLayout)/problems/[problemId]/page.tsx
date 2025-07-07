import { ProblemWorksSection } from '@/features/problem';
import { getUserInfo } from '@/features/problem/actions/problem.actions';
import { redirect } from 'next/navigation';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
}
export default async function ProblemPage({ params }: IProblemPageProps) {
  const problemId = (await params).problemId;

  const userInfo = await getUserInfo();

  if (!userInfo) {
    redirect('/signin');
  }

  return <ProblemWorksSection problemId={problemId} githubUrl={userInfo.githubUrl} />;
}
