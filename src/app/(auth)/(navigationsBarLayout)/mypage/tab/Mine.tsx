import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Heatmap } from '../ui/Heatmap';
import {
  useEmailVerify,
  useMyAiReviewCheckQuery,
  useMyDailySolved,
  useMyInfoQuery,
  useMyRankingQuery,
} from '@/entities/mypage/model/query';
import { IHeatmapItem } from '@/entities/mypage/model/types';
import { User } from 'lucide-react';
import Mail from './../../../../../../public/icons/mypage/mail.svg';
import Bookopen from './../../../../../../public/icons/mypage/bookopen.svg';
import { Button } from '@/shared/ui/button/Button';
import { BASE_URL } from '@/constants/env';

const DetailInfoRow = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-gray-800/50 p-3 rounded-lg flex flex-col">
    <div className="text-sm text-gray-400">{title}</div>
    <div className="text-lg font-bold" style={{ color: '#FFF' }}>
      {value}
    </div>
  </div>
);

export const Mine = () => {
  const { data } = useMyInfoQuery();
  const { data: ranking } = useMyRankingQuery('all-time');
  const { data: aiReview } = useMyAiReviewCheckQuery();
  const { data: heatmap } = useMyDailySolved();
  const { mutateAsync: emailVerfiy } = useEmailVerify(BASE_URL || '');
  const myInfo = data?.data.result;
  const myRanking = ranking?.data.result;

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
      <section className="rounded-lg flex flex-col gap-8 border bg-gray-900/50 border-gray-700/50 p-10">
        <div className="flex flex-row gap-4 items-center">
          <User size={24} style={{ color: '#00d084' }} />
          <h2 className="font-bold text-2xl">프로필 정보</h2>
        </div>
        <div className="flex flex-row gap-4">
          {myInfo?.profileImageUrl ? (
            <Image alt="my" width={150} height={150} src={myInfo.profileImageUrl} />
          ) : (
            <Image width={150} height={150} src="/icons/mypage/defaultImg.svg" alt="my" />
          )}
          <div className="flex flex-col gap-3 flex-1">
            <span className="font-bold text-2xl">{myInfo?.username}</span>
            <div className="flex rounded-full px-2 py-4 items-center justify-center font-light bg-[#214d35] w-fit">
              <span className="text-xs leading-0">{myInfo?.tier}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full ">
              <DetailInfoRow
                title="랭킹"
                value={`# ${myRanking?.find((item) => item.isMe)?.ranks.toLocaleString() || 0}`}
              />
              <DetailInfoRow title="푼 문제수" value={myInfo?.totalSolvedCount || 0} />
              <DetailInfoRow title="남은 리뷰" value={aiReviewCnt || 0} />
              <DetailInfoRow title="아이디" value={myInfo?.nickname || ''} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Image src={Mail} width={20} height={20} alt="mail" />
            <div>
              <div className="text-sm text-gray-400">이메일</div>
              <div className="text-white font-medium">{myInfo?.email}</div>
            </div>
          </div>

          {myInfo?.verified ? (
            <div className="flex items-center gap-2 text-green-400">
              <span className="font-medium">✓ 인증 완료</span>
            </div>
          ) : (
            <Button
              variant="primary"
              label="이메일 인증"
              onClick={async () => {
                const response = await emailVerfiy();
                alert(response);
              }}
            />
          )}
        </div>
      </section>
      <section className="rounded-lg flex flex-col gap-8 border bg-gray-900/50 border-gray-700/50 p-10">
        <div className="flex flex-row gap-2">
          <Image src={Bookopen} alt="bookopen" width={30} height={30} />
          <h2 className="font-bold text-2xl">문제 풀이 기록</h2>
        </div>
        {heatmapData.length > 0 && <Heatmap data={heatmapData} />}
      </section>
    </div>
  );
};
