import { getSessionKey } from '@/entities/problem/api/server/getSessionKey';
import { getGitHubUrl } from '@/features/submitCode/gitPush/api/server/getGitHub';
import ProblemWorksSection from '@/features/submitCode/submission/ui/ProblemWorksSection';

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
