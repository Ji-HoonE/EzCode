import { Button } from '@/components/ui/button';
import { useMyAiReviewCheckQuery, useMyDailySolved, useMyInfoQuery } from '@/query/mypage/mypage';
import { TPeriod } from '@/shared/types/mypage.type';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { IHeatmapItem } from '@/query/mypage/mypage.interface';
import { Heatmap } from '../Heatmap';
const SummaryStatItem = ({ title, value }: { title: string; value: string | number }) => (
  <div className="flex flex-col gap-2">
    <span className="text-center font-bold text-[#EBEBEBAB] text-xs">{title}</span>
    <span className="text-center font-bold text-white text-2xl">{value}</span>
  </div>
);

const DetailInfoRow = ({
  title,
  value,
  verify = false,
}: {
  title: string;
  value: string;
  verify?: boolean;
}) => (
  <div className="flex flex-row gap-4 items-center">
    <span className="w-[90px] text-center font-bold text-[#EBEBEBAB] text-xs">{title}</span>
    <span className="text-center font-bold text-[#FFFFFFD9] text-[20px] leading-[30px]">
      {value}
    </span>
    {verify && (
      <Button className="bg-[#00A141] text-bold text-[10px] leading-[30px]">이메일 인증</Button>
    )}
  </div>
);

export const Mine = () => {
  const [_unused, _setUnused] = useState<TPeriod>('all-time');
  const { data } = useMyInfoQuery();
  // const { data: ranking } = useMyRankingQuery(period || 'all-time');
  const { data: aiReview } = useMyAiReviewCheckQuery();
  const { data: heatmap } = useMyDailySolved();
  const myInfo = data?.data.result;
  // const myRanking = ranking?.data.result;
  const aiReviewCnt = aiReview?.data.result.reviewToken;
  const [heatmapData, setHeatmapData] = useState<IHeatmapItem[]>([]);
  const levelCalculator = (count: number) => {
    if (count === 0) {
      return 0;
    } else if (count < 4) {
      return 1;
    } else if (count < 7) {
      return 2;
    } else if (count < 10) {
      return 3;
    } else {
      return 4;
    }
  };
  useEffect(() => {
    if (!heatmap?.data.result) return;
    const newData = heatmap.data.result.dailySolvedCounts.map((item) => ({
      ...item,
      level: levelCalculator(item.count),
    }));

    setHeatmapData(newData);
  }, [heatmap]);

  return (
    <div className=" flex flex-col gap-10 h-full">
      <section className="bg-[#004B1133] rounded-[25px] flex flex-col justify-center items-center px-[100px] pt-8 pb-[100px] gap-4">
        <div className="flex justify-end w-full">
          <Image src="/icons/mypage/modify.svg" alt="modify" width={27} height={27} />
        </div>
        <div className="flex flex-row gap-12 w-full">
          <div className="flex flex-col gap-12">
            {myInfo?.profileImageUrl ? (
              <Image alt="my" width={270} height={270} src={myInfo.profileImageUrl} />
            ) : (
              <Image width={270} height={270} src="/icons/mypage/defaultImg.svg" alt="my" />
            )}
            <span className="text-center font-extrabold text-[40px] leading-[30px]">
              {myInfo?.username}
            </span>
          </div>
          <div className="flex flex-col flex-1 gap-11 px-25 justify-center">
            <div className="flex flex-row justify-between px-10 w-full">
              <SummaryStatItem title="랭킹" value="7" />
              <SummaryStatItem title="푼 문제 수" value={myInfo?.totalSolvedCount || 0} />
              <SummaryStatItem title="남은 AI 리뷰 수" value={aiReviewCnt || 0} />
            </div>
            <hr className="text-[#FFFFFF57]" />

            <div className="flex flex-col w-full gap-8">
              <DetailInfoRow title="티어" value={myInfo?.tier || ''} />
              <DetailInfoRow title="아이디" value={myInfo?.nickname || ''} />
              <DetailInfoRow title="이메일" value={myInfo?.email || ''} verify />
            </div>
          </div>
        </div>
      </section>

      {heatmapData.length > 0 && <Heatmap data={heatmapData} />}
    </div>
  );
};
