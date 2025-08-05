'use client';
import { PATHS } from '@/constants/paths';
import { ProblemId } from '@/shared';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function TabsToggle({ problemId }: { problemId: ProblemId }) {
  const [activeTab, setActiveTab] = useState<'problem' | 'discussion'>('problem');

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  params.set('discussion', 'true');

  const handleTabChange = (tab: 'problem' | 'discussion') => {
    setActiveTab(tab);
    if (tab === 'problem') {
      router.push(`${PATHS.PROBLEMS}/${problemId}`);
      setActiveTab('problem');
    } else {
      router.push(`?${params.toString()}`);
      setActiveTab('discussion');
    }
  };

  return (
    <div className="flex gap-4 mb-6 bg-secondary-background rounded-[10px] p-1">
      <button
        onClick={() => handleTabChange('problem')}
        className={clsx(
          'flex-1 py-3 px-6 rounded-[10px] font-medium transition-all duration-200 text-white',
          activeTab === 'problem'
            ? 'bg-primary'
            : 'hover:bg-[rgba(255,255,255,0.08)] hover:text-secondary'
        )}
      >
        문제
      </button>
      <button
        onClick={() => handleTabChange('discussion')}
        className={`flex-1 py-3 px-6 rounded-[10px] font-medium transition-all duration-200 ${
          activeTab === 'discussion'
            ? 'bg-[#214d35] text-white shadow-lg'
            : 'text-white hover:bg-[rgba(255,255,255,0.08)] hover:text-[#00d084]'
        }`}
      >
        토론
      </button>
    </div>
  );
}
