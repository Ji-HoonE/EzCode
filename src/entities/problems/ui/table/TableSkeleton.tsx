import { SkeletonBox } from '@/shared/ui/loading-indicators';

export default function TableSkeleton() {
  return Array.from({ length: 10 }).map((_, idx) => (
    <tr key={idx} className="border-b border-gray-800">
      {Array.from({ length: 7 }).map((__, colIdx) => (
        <td key={colIdx} className="text-center py-3 px-2">
          <SkeletonBox width={60} height={16} />
        </td>
      ))}
    </tr>
  ));
}
