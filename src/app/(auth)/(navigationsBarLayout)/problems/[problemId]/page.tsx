import { ProblemWorksSection } from '@/features/problem';
import { getSessionKey } from '@/features/problem/api/server/getSessionKey';
import { getGitHubUrl } from '@/features/submitProblem';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
}
export default async function ProblemPage({ params }: IProblemPageProps) {
  const problemId = (await params).problemId;
  const sessionKey = await getSessionKey(problemId);
  const githubUrl = await getGitHubUrl();

  return (
    <ProblemWorksSection problemId={problemId} githubUrl={githubUrl} sessionKey={sessionKey} />
  );
}
