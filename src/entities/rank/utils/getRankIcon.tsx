import { Award, Crown, Medal } from 'lucide-react';

export const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
  if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
  return <span className="text-lg font-bold text-[#00d084]">#{rank}</span>;
};
