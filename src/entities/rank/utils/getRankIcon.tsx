import Gold from './../../../../public/icons/medal/gold_medal.svg';
import Silver from './../../../../public/icons/medal/silver_medal.svg';
import Bronze from './../../../../public/icons/medal/bronze_medal.svg';
import Image from 'next/image';

export const getRankIcon = (rank: number) => {
  if (rank === 1)
    return (
      <Image width={20} height={20} src={Gold} alt="medal" className="w-6 h-6 text-yellow-400" />
    );
  if (rank === 2)
    return (
      <Image width={20} height={20} alt="medal" src={Silver} className="w-6 h-6 text-gray-300" />
    );
  if (rank === 3)
    return (
      <Image width={20} height={20} alt="medal" src={Bronze} className="w-6 h-6 text-amber-600" />
    );
  return <span className="text-lg font-bold text-[#00d084]">#{rank}</span>;
};
