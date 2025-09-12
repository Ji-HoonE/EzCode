import { getGitHubUrl } from '@/entities/submitCode';
import ProblemWorksSection from '@/features/submitCode/submission/ui/ProblemWorksSection';
import Cookies from 'js-cookie';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
}
export default async function ProblemPage({ params }: IProblemPageProps) {
  const problemId = (await params).problemId;
  const accessToken = Cookies.get('accessToken');

  let githubUrl: string | null = null;

  if (accessToken) {
    try {
      githubUrl = await getGitHubUrl();
    } catch (error) {
      console.error(error);
    }
  }

  return <ProblemWorksSection problemId={problemId} githubUrl={githubUrl} />;
}
