import { getSubmitPrepareData } from '@/entities/problem';
import { getGitHubUrl } from '@/entities/submitCode/gitpush/actions/getGitHub';
import ProblemWorksSection from '@/features/submitCode/submission/ui/ProblemWorksSection';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
}
export default async function ProblemPage({ params }: IProblemPageProps) {
  const problemId = (await params).problemId;
  const submitPrepareData = await getSubmitPrepareData(problemId);
  const githubUrl = await getGitHubUrl();

  return (
    <ProblemWorksSection
      problemId={problemId}
      githubUrl={githubUrl}
      submitPrepareData={submitPrepareData}
    />
  );
}
