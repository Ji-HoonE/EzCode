import { ActivityCalendar } from 'react-activity-calendar';
import { eachDayOfInterval, format, startOfYear, endOfYear } from 'date-fns';
import { useMemo, useState } from 'react';
import { IHeatmapItem } from '@/entities/mypage/model/types';
import { Select } from '@/shared/ui/select/Select';

export const Heatmap = ({ data }: { data: IHeatmapItem[] }) => {
  const currentYear = new Date().getFullYear();

  // 최근 3년 (올해 포함)
  const yearList = [0, 1, 2].map((i) => (currentYear - i).toString());

  const [tab, setTab] = useState(yearList[0]); // 최신 연도부터 시작

  // 연도별 데이터 생성
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
    <div className="flex flex-row gap-10 flex-1">
      <ActivityCalendar
        hideTotalCount
        blockSize={18}
        blockRadius={4}
        fontSize={16}
        theme={{
          light: ['#1F1F1F', '#005413', '#037732', '#00A141', '#00E35B'],
          dark: ['#1F1F1F', '#005413', '#037732', '#00A141', '#00E35B'],
        }}
        data={fullYearData}
      />

      <Select
        option={[
          { label: '2025', value: '2025' },
          { label: '2024', value: '2024' },
          { label: '2023', value: '2023' },
        ]}
        title=""
        value={tab}
        setValue={(value) => setTab(value)}
      />
    </div>
  );
};
