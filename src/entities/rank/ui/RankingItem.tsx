import Image from 'next/image';
import clsx from 'clsx';
import { IRanking } from '../types';
import { getRankIcon } from '../utils/getRankIcon';

interface IRankingItem {
  ranking: IRanking;
}

export default function RankingItem({ ranking }: IRankingItem) {
  const badge = getRankIcon(ranking?.ranks);

  const { ranks, nickname, score } = ranking;

  return (
    <li
      key={ranks}
      className={clsx(
        'flex items-center justify-between p-4 hover:bg-white/5 transition-colors duration-200 ',
        ranks === 3 ? 'border-none' : 'border-b border-border_primary'
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {badge && <span className="text-lg">{badge}</span>}
          <span className="font-semibold text-white">{nickname}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Image src="/icons/star.svg" alt="star" width={16} height={16} />
        <span className="font-bold text-secondary">{score.toLocaleString()}</span>
        <span className="text-gray-400 text-sm">점</span>
      </div>
    </li>
  );
}
