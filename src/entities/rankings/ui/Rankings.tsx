import { IRanking } from '../actions/getRankings.actions.types';

interface RankingsProps {
  rankings: IRanking[];
}

export default function Rankings({ rankings }: RankingsProps) {
  if (!rankings || rankings.length < 1) {
    return <div>랭킹을 불러오는데 실패했어요.</div>;
  }
  return (
    <ul>
      {rankings.map((ranking) => (
        <li key={ranking.userId}>
          {ranking.ranks} 등 : {ranking.nickname} | {ranking.score} 점
        </li>
      ))}
    </ul>
  );
}
