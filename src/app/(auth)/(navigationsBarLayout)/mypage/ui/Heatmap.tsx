import { ActivityCalendar } from 'react-activity-calendar';
import { eachDayOfInterval, format, startOfYear, endOfYear } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { IHeatmapItem } from '@/entities/mypage/model/types';
import { Select } from '@/shared/ui/select/Select';

export const Heatmap = ({ data }: { data: IHeatmapItem[] }) => {
  const currentYear = new Date().getFullYear();
  const yearList = [0, 1, 2].map((i) => (currentYear - i).toString());
  const [tab, setTab] = useState(yearList[0]);

  const [hoverData, setHoverData] = useState<IHeatmapItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const fullYearData = useMemo(() => {
    const year = Number(tab);
    const allDatesOfYear = eachDayOfInterval({
      start: startOfYear(new Date(year, 0, 1)),
      end: endOfYear(new Date(year, 11, 31)),
    });

    const dataMap = new Map(
      data.filter((d) => d.date.startsWith(tab)).map((item) => [item.date, item])
    );

    return allDatesOfYear.map((date) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      return (
        dataMap.get(dateStr) || {
          date: dateStr,
          count: 0,
          level: 0,
        }
      );
    });
  }, [tab, data]);

  return (
    <div
      className="flex flex-row gap-10 flex-1 relative"
      onMouseLeave={() => {
        setHoverData(null);
        setTooltipPos(null);
      }}
    >
      <ActivityCalendar
        renderBlock={(blockElement, blockProps) => {
          return React.cloneElement(blockElement, {
            onMouseEnter: (e: React.MouseEvent) => {
              const rect = (e.target as HTMLElement).getBoundingClientRect();
              const containerRect = (e.currentTarget as HTMLElement)
                .closest('div')!
                .getBoundingClientRect();
              setHoverData(blockProps as IHeatmapItem);
              setTooltipPos({
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top, // 블록 위쪽
              });
            },
            onMouseLeave: () => {
              setHoverData(null);
              setTooltipPos(null);
            },
            style: {
              ...blockElement.props.style,
              cursor: 'pointer',
            },
          });
        }}
        hideTotalCount
        blockSize={17}
        blockRadius={4}
        fontSize={16}
        theme={{
          light: ['#1F1F1F', '#005413', '#037732', '#00A141', '#00E35B'],
          dark: ['#1F1F1F', '#005413', '#037732', '#00A141', '#00E35B'],
        }}
        data={fullYearData}
      />

      {/* 툴팁 */}
      {hoverData && tooltipPos && (
        <div
          className="absolute px-2 py-1 bg-black text-white text-xs rounded pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y - 30, // 블록 위 30px
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          <div>{hoverData.date}</div>
          <div>{hoverData.count} 문제</div>
        </div>
      )}

      <Select
        option={yearList.map((y) => ({ label: y, value: y }))}
        title=""
        value={tab}
        setValue={(value) => setTab(value)}
        size="sm"
        className="absolute -top-15 right-15"
      />
    </div>
  );
};
