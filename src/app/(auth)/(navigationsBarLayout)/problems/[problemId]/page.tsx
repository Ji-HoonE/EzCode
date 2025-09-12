import ProblemWorksSection from '@/features/submitCode/submission/ui/ProblemWorksSection';

interface IProblemPageProps {
  params: Promise<{ problemId: string }>;
}
export default async function ProblemPage({ params }: IProblemPageProps) {
  const problemId = (await params).problemId;

  return <ProblemWorksSection problemId={problemId} />;
}
