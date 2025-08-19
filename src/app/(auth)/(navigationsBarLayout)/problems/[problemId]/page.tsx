import { getSubmitPrepareData } from '@/entities/problem';
import { ISubmitPrepareData } from '@/entities/problem/api/server/getSubmitPrepareData.type';
import { getGitHubUrl } from '@/entities/submitCode/gitpush/actions/getGitHub';
import ProblemWorksSection from '@/features/submitCode/submission/ui/ProblemWorksSection';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
}
export default async function ProblemPage({ params }: IProblemPageProps) {
  const problemId = (await params).problemId;
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  let submitPrepareData: ISubmitPrepareData | undefined;
  let githubUrl: string | null = null;

  if (accessToken) {
    try {
      submitPrepareData = await getSubmitPrepareData(problemId);

      githubUrl = await getGitHubUrl();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ProblemWorksSection
      problemId={problemId}
      githubUrl={githubUrl}
      submitPrepareData={submitPrepareData}
    />
  );
}
