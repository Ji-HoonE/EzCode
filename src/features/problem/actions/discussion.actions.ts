'use server';

import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { IDiscussionResponse } from '../types/discussion.response.data.type';

const reqType = 'server';

//토론 불러오기
export const getDiscussions = async (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'DISCUSSION');

  try {
    const response = await ApiHelper.get<IDiscussionResponse>(`${path}`, { reqType: reqType });
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};
