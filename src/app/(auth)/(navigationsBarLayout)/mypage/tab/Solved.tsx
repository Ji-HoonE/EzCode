import { useSubmissionList } from '@/entities/mypage/model/query';
import { History } from 'lucide-react';
import { SubmissionsResonse } from '@/entities/mypage/model/types';

const Badge = ({
  color,
  className,
  text,
}: {
  color?: string;
  className?: string;
  text: string;
}) => (
  <div
    className={className}
    style={{
      backgroundColor: color + '20',
      color: color,
      border: `1px solid ${color}40`,
      borderRadius: '9999px',
      padding: '2px 12px',
      fontSize: '12px',
    }}
  >
    {text}
  </div>
);

const getResultBadge = (result: string) => {
  if (result === '정답') {
    return (
      <Badge className="bg-green-900/40 text-green-400 border border-green-500/30" text={result} />
    );
  } else if (result === '시간 초과') {
    return (
      <Badge
        className="bg-yellow-900/40 text-yellow-400 border border-yellow-500/30"
        text={result}
      />
    );
  } else if (result === '메모리 초과') {
    return (
      <Badge
        className="bg-orange-900/40 text-orange-400 border border-orange-500/30"
        text={result}
      />
    );
  } else {
    return <Badge className="bg-red-900/40 text-red-400 border border-red-500/30" text={result} />;
  }
};

const Card = ({ submissions }: { submissions: SubmissionsResonse }) => {
  const result = submissions.submissions[0].isCorrect ? '정답' : '오답';
  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes('LV1')) return '#cd7f32'; // Bronze
    if (difficulty.includes('LV2')) return '#c0c0c0'; // Silver
    if (difficulty.includes('LV3')) return '#ffd700'; // Gold
    if (difficulty.includes('LV4')) return '#00ff9f'; // Mint
    if (difficulty.includes('LV5')) return '#00bfff'; // Deep Sky Blue
    if (difficulty.includes('LV6')) return '#8a2be2'; // Blue Violet
    if (difficulty.includes('LV7')) return '#ff4500'; // Orange Red
    return '#888'; // Default color
  };
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 ">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">#{submissions.problemId}</span>
          <h3 className="text-white font-medium">{submissions.problemTitle}</h3>
          <Badge
            text={submissions.problemDifficulty}
            color={getDifficultyColor(submissions.problemDifficulty)}
          />
        </div>
        {getResultBadge(result)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-gray-400">언어:</span>
          <span className="text-white ml-2">{submissions.submissions[0].language}</span>
        </div>
        <div>
          <span className="text-gray-400">실행시간:</span>
          <span className="text-white ml-2">{submissions.submissions[0].executionTime}ms</span>
        </div>
        <div>
          <span className="text-gray-400">메모리:</span>
          <span className="text-white ml-2">{submissions.submissions[0].memoryUsage}KB</span>
        </div>
        <div>
          <span className="text-gray-400">제출일:</span>
          <span className="text-white ml-2">
            {submissions.submissions[0].submittedAt.split('T')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

export const Solved = () => {
  const { data } = useSubmissionList();
  // const [onModal, setOnModal] = useState(false);
  // const [selected, setSelected] = useState(0);

  return (
    <div className="w-full flex flex-col gap-10 pb-10">
      {/* {data && onModal && (
        <SolvedModal
          open={onModal}
          data={data?.result[selected]}
          onClose={() => {
            setOnModal(false);
          }}
        />
      )} */}
      <section className="rounded-lg flex flex-col gap-8 border bg-gray-900/50 border-gray-700/50 p-10">
        <div className="flex flex-row gap-4 items-center">
          <History size={24} style={{ color: '#00d084' }} />
          <h1 className="text-2xl leading-0 font-bold">문제 풀이 기록</h1>
        </div>
      </section>
      <div className="flex flex-col gap-2">
        {data?.result?.length || 0 > 0 ? (
          data?.result.map((item) => {
            return <Card key={item.problemId} submissions={item} />;
          })
        ) : (
          <span>푼 문제가 없습니다.</span>
        )}
      </div>
    </div>
  );
};
