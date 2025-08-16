interface PendingResultItemProps {
  index: number;
}

export default function PendingResultItem({ index }: PendingResultItemProps) {
  return (
    <div className="flex p-1.5 border-[1px] rounded-lg text-gray-300 text-sm bg-gray-600 border-none">
      <p>[ {index + 1} ] 상태 : 채점 중 ...</p>
    </div>
  );
}
