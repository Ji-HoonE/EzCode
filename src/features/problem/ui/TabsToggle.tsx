'use client';
import { Button } from '@/components/ui/button';
import { PATHS } from '@/constants/paths';
import { ProblemId } from '@/shared';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TabsToggle({ problemId }: { problemId: ProblemId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.set('discussion', 'true');

  return (
    <div className="flex gap-4">
      <Button onClick={() => router.push(`${PATHS.PROBLEMS}/${problemId}`)}>문제</Button>
      <Button onClick={() => router.push(`?${params.toString()}`)}>토론</Button>
    </div>
  );
}
