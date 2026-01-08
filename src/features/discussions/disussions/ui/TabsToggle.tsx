'use client';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TabsToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const active: 'discussion' | 'problem' = searchParams.get('discussion')
    ? 'discussion'
    : 'problem';

  const handleTabChange = (tab: 'problem' | 'discussion') => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab === 'problem') {
      params.delete('discussion');
    } else {
      params.set('discussion', 'true');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mb-6 bg-secondary-background rounded-[10px] p-1">
      <button
        onClick={() => handleTabChange('problem')}
        className={clsx(
          'flex-1 py-3 px-6 rounded-[10px] font-medium transition-all duration-200',
          active === 'problem'
            ? 'bg-primary'
            : 'hover:bg-[rgba(255,255,255,0.08)] hover:text-secondary'
        )}
      >
        문제
      </button>
      <button
        onClick={() => handleTabChange('discussion')}
        className={`flex-1 py-3 px-6 rounded-[10px] font-medium transition-all duration-200 ${
          active === 'discussion'
            ? 'bg-primary shadow-lg'
            : 'text-white hover:bg-[rgba(255,255,255,0.08)] hover:text-secondary'
        }`}
      >
        토론
      </button>
    </div>
  );
}
