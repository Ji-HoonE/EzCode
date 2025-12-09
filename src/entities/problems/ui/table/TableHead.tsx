const TABLE_HEAD_ARRAY = [
  { label: '번호', key: 'number' },
  { label: '제목', key: 'title' },
  { label: '점수', key: 'score' },
  { label: '난이도', key: 'difficulty' },
  { label: '정답', key: 'answers' },
  { label: '제출', key: 'submissions' },
  { label: '정답률', key: 'successRate' },
];
export default function TableHead() {
  return (
    <thead>
      <tr className="border-b border-gray-800 bg-gray-800/50">
        {TABLE_HEAD_ARRAY.map((head) => (
          <th className="px-6 py-4 text-center text-sm font-medium text-gray-300" key={head.key}>
            {head.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
