import Image from 'next/image';
import { IRanking } from '../actions/getRankings.actions.types';
import clsx from 'clsx';

interface IRankingItem {
  ranking?: IRanking;
  badge?: string;
}

export default function RankingItem({ ranking, badge }: IRankingItem) {
  if (!ranking) {
    return (
      <li className="flex items-center  p-4  transition-colors duration-200 space-x-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
          !
        </div>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-white text-center w-full">아직 랭킹이 없습니다.</span>
        </div>
      </li>
    );
  }

  const { ranks, nickname, score } = ranking;

  return (
    <li
      key={ranks}
      className={clsx(
        'flex items-center justify-between p-4 hover:bg-white/5 transition-colors duration-200 ',
        ranks === 10 ? 'border-none' : 'border-b border-border_primary'
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
          {ranks}
        </div>
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
