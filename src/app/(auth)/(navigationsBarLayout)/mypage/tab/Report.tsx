import { ReportReasonEnum, ReportStatusEnum } from '@/entities/mypage/model/enum';
import { useReportList } from '@/entities/mypage/model/query';

import { Badge } from '@/shared/ui/badge/Badge';
import { Flag } from 'lucide-react';

// ✅ 상태별 뱃지 스타일 미리 정의 (컴포넌트 밖으로 분리하여 성능 최적화)
const STATUS_CONFIG: Record<ReportStatusEnum, { label: string; color: string; bgColor: string }> = {
  [ReportStatusEnum.Pending]: {
    label: '처리 전',
    color: '#f59e0b',
    bgColor: '#fef3c7',
  },
  [ReportStatusEnum.InProgress]: {
    label: '진행중',
    color: '#3b82f6',
    bgColor: '#dbeafe',
  },
  [ReportStatusEnum.Rejected]: {
    label: '기각됨',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
  [ReportStatusEnum.Canceled]: {
    label: '사용자 철회',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
  [ReportStatusEnum.Resolved]: {
    label: '조치 완료',
    color: '#10b981',
    bgColor: '#d1fae5',
  },
};

export const Report = () => {
  const { data } = useReportList();

  const getStatusBadge = (status: ReportStatusEnum) => {
    const config = STATUS_CONFIG[status];
    if (!config) return;
    return <Badge color={config.color} className="text-xs font-medium" text={config.label} />;
  };

  const reports = data?.result ?? [];

  return (
    <div className="flex flex-col gap-10 h-full">
      <section className="rounded-lg flex flex-col gap-8 border bg-gray-900/50 border-gray-700/50 p-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Flag size={24} style={{ color: '#00d084' }} />
            <h2 className="font-bold text-2xl">신고 내역</h2>
          </div>
        </div>

        <div className="space-y-4">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report.id}
                className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">{report.message}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        카테고리:{' '}
                        {ReportReasonEnum[report.reportType as keyof typeof ReportReasonEnum] ??
                          '알 수 없음'}
                      </span>
                      <span>신고일: {report.createdAt.split('T')[0]}</span>
                    </div>
                  </div>
                  <div className="ml-4">{getStatusBadge(report.reportStatus)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Flag size={48} className="mx-auto mb-4 text-gray-600" />
              <p className="text-gray-400">신고 내역이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
