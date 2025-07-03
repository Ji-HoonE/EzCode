'use server';

import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { IDetailProblemResponse } from '../types/problem.response.data.type';
import { ProblemId } from '@/shared';

const reqType = 'server';

//문제 불러오기
export const getDetailProblem = async (problemId: ProblemId) => {
  try {
    const response = await ApiHelper.get<IDetailProblemResponse>(
      `${API_URL.PROBLEM.GET_PROBLEMS}/${problemId}`,
      { reqType: reqType }
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
};
