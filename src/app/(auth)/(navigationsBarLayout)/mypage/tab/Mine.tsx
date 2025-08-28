import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Heatmap } from '../ui/Heatmap';
import {
  useEmailVerify,
  useGetLanguageList,
  useModifyInfo,
  useMyAiReviewCheckQuery,
  useMyDailySolved,
  useMyInfoQuery,
  useMyRankingQuery,
} from '@/entities/mypage/model/query';
import { IHeatmapItem, IModifyBody, IMyInfo } from '@/entities/mypage/model/types';
import { Check, User } from 'lucide-react';

import Bookopen from './../../../../../../public/icons/mypage/bookopen.svg';
import { Button } from '@/shared/ui/button/Button';
import { BASE_URL } from '@/constants/env';
import { ModifyForm } from '../ui/ModifyForm';

import { useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/shared/ui/badge/Badge';

export const Mine = () => {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<'info' | 'modify'>('info');
  const [editForm, setEditForm] = useState<IMyInfo>({
    nickname: '',
    githubUrl: '',
    blogUrl: '',
    profileImageUrl: '',
    tier: '',
    introduction: '',
    age: 0,
    email: '',
    totalSolvedCount: 0,
    username: '',
    userRole: '',
    verified: false,
    userAuthTypes: [],
    language: null,
  });

  const [info, setInfo] = useState<IMyInfo>(Object);
  const [heatmapData, setHeatmapData] = useState<IHeatmapItem[]>([]);
  const { data } = useMyInfoQuery();
  const { data: languages } = useGetLanguageList();
  const { data: ranking } = useMyRankingQuery('all-time');
  const { data: aiReview } = useMyAiReviewCheckQuery();
  const { data: heatmap } = useMyDailySolved();
  const { mutateAsync: emailVerfiy } = useEmailVerify(BASE_URL || '');
  const { mutateAsync: modify } = useModifyInfo();
  const [languageList, setLanguageList] = useState<{ label: string; value: string }[]>([]);

  const myInfo = data?.data.result;
  const myRanking = ranking?.data.result;

  const aiReviewCnt = aiReview?.data.result.reviewToken;
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

  useEffect(() => {
    if (!myInfo) return;
    setInfo(myInfo);
  }, [myInfo]);

  useEffect(() => {
    if (!languages) return;
    languages.data.result.map((item) => {
      setLanguageList((prev) => [...prev, { label: item.name, value: String(item.id) }]);
    });
  }, [languages]);

  return (
    <div className=" flex flex-col gap-10 h-full">
      <section className="rounded-lg flex flex-col gap-8 border bg-gray-900/50 border-gray-700/50 p-10">
        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-row gap-4 items-center">
            <User size={24} style={{ color: '#00d084' }} />
            <h2 className="font-bold text-2xl">프로필 정보</h2>
          </div>
          <div className="flex flex-row gap-2">
            <Button
              label={tab === 'info' ? '수정' : '저장'}
              onClick={async () => {
                if (tab === 'info') {
                  setTab('modify');
                } else {
                  if (editForm.nickname.length < 1) {
                    alert('닉네임을 확인해주세요.');
                    return;
                  }

                  // API 요청용 body 생성
                  const body: IModifyBody = {
                    age: editForm.age,
                    blogUrl: editForm.blogUrl || null,
                    githubUrl: editForm.githubUrl || null,
                    introduction: editForm.introduction || null,
                    languageId: editForm.language?.id || null, // 여기서 id만 보냄
                    nickname: editForm.nickname,
                  };

                  const response = await modify({
                    request: body,
                    image: editForm.profileImage ?? undefined,
                  });

                  alert(response.message);
                  if (response.status === 200) {
                    queryClient.invalidateQueries({ queryKey: ['my-info'] });
                    setTab('info');
                  }
                }
              }}
            />
            {tab === 'modify' && (
              <Button
                label="취소"
                onClick={() => {
                  setTab('info');
                  setEditForm(info);
                }}
              />
            )}
          </div>
        </div>
        {tab === 'info' ? (
          <>
            <div className="flex items-start gap-8">
              {/* 프로필 정보 - 세로 배치 (너비 2배 확장) */}
              <div className="flex flex-col items-center space-y-4 w-52">
                {/* 프로필 사진 */}

                {myInfo?.profileImageUrl ? (
                  <Image alt="my" width={150} height={150} src={myInfo.profileImageUrl} />
                ) : (
                  <Image width={150} height={150} src="/icons/mypage/defaultImg.svg" alt="my" />
                )}

                {/* 닉네임 */}
                <h2 className="text-2xl font-bold text-white text-center">{myInfo?.nickname}</h2>

                {/* 티어 */}
                <Badge className="text-white font-medium bg-[#214d35]" text={myInfo?.tier || ''} />

                {/* 자기소개 */}
                {myInfo?.introduction && (
                  <p className="text-white text-sm text-center leading-relaxed">
                    {myInfo.introduction}
                  </p>
                )}

                {/* 소셜 링크 아이콘들 */}
                <div className="flex items-center gap-4 mt-4">
                  {myInfo?.githubUrl && (
                    <a
                      href={
                        myInfo.githubUrl.startsWith('http')
                          ? myInfo.githubUrl
                          : `https://${myInfo.githubUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      title="GitHub"
                    >
                      <Image src="/icons/mypage/github.svg" alt="github" width={20} height={20} />
                    </a>
                  )}
                  {myInfo?.blogUrl && (
                    <a
                      href={
                        myInfo.blogUrl.startsWith('http')
                          ? myInfo.blogUrl
                          : `https://${myInfo.blogUrl}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                      title="blog"
                    >
                      <Image src="/icons/mypage/blog.svg" alt="blog" width={20} height={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* 통계 정보 - 세로 중앙 배치로 변경 */}
              <div className="flex-1 flex flex-col justify-center space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">랭킹</div>
                    <div className="text-xl font-bold text-white">
                      #{myRanking?.filter((item) => item.isMe)[0].ranks}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">푼 문제 수</div>
                    <div className="text-xl font-bold" style={{ color: '#00d084' }}>
                      {myInfo?.totalSolvedCount}
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">남은 리뷰</div>
                    <div className="text-xl font-bold text-white">{aiReviewCnt}</div>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">언어</div>
                    <div className="text-xl font-bold text-white">
                      {myInfo?.language?.name || '-'}
                    </div>
                  </div>
                </div>

                {/* 이메일 정보를 오른쪽 섹션으로 이동 */}
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    {/* <Mail size={20} className="text-gray-400" /> */}
                    <div>
                      <div className="text-sm text-gray-400">이메일</div>
                      <div className="text-white font-medium">{myInfo?.email}</div>
                    </div>
                  </div>

                  {myInfo?.verified ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <Check size={20} />
                      <span className="font-medium">인증 완료</span>
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
              </div>
            </div>
          </>
        ) : (
          <ModifyForm
            languageList={languageList}
            myInfo={info}
            editForm={editForm}
            setEditForm={setEditForm}
            languages={languages?.data.result}
          />
        )}
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
