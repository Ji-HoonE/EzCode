import { IHeatmapItem } from '@/query/mypage/mypage.interface'; //DailySolved
import { ActivityCalendar } from 'react-activity-calendar';
import { eachDayOfInterval, format, startOfYear, endOfYear } from 'date-fns';
export const Heatmap = ({ data }: { data: IHeatmapItem[] }) => {
  const allDatesOfYear = eachDayOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  });

  // 날짜를 키로 빠르게 찾기 위한 map 생성
  const dataMap = new Map(data.map((item) => [item.date, item]));

  const fullYearData = allDatesOfYear.map((date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    if (dataMap.has(dateStr)) {
      return dataMap.get(dateStr)!; // 기존 데이터 사용
    } else {
      return {
        date: dateStr,
        count: 0,
        level: 0,
      };
    }
  });

  return (
    <ActivityCalendar
      hideTotalCount
      blockSize={16}
      blockRadius={4}
      fontSize={16}
      theme={{
        light: ['#1F1F1F', '#005413', '#037732', '#00A141', '#00E35B'],
        dark: ['#1F1F1F', '#005413', '#037732', '#00A141', '#00E35B'],
      }}
      data={fullYearData}
    />
  );
};
