'use server';
import ApiHelper from '@/api/client/api';
import { IMyInfo } from '@/entities/mypage/model/types';

//유저 정보 불러오기 -> git 연동 유무 파악을 위해
export const getGitHubUrl = async () => {
  const response = await ApiHelper.get<IMyInfo>('/users', { reqType: 'server' });
  return response.data.result.githubUrl;
};
