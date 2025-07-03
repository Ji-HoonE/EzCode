'use client';
import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared/types/problem.type';
import { IProblemRequestData } from '../types/problem.request.data.type';
import { IProblemResponseData } from '../types/problem.response.data.type';

//문제 제출하기
export const submitSourceCodeData = async (
  problemId: ProblemId,
  submitData: IProblemRequestData
) => {
  try {
    const res = await ApiHelper.post<IProblemResponseData>(
      `${API_URL.PROBLEM.GET_PROBLEMS}/${problemId}/submit-ws`,
      submitData,
      {
        reqType: 'client',
      }
    );
    if (res.data.status !== 200) {
      throw new Error(`문제 제출 실패: ${res.data.message}`);
    }
    const sessionKey = Array.isArray(res.data.result) ? res.data.result[0] : undefined;
    return sessionKey;
  } catch (error) {
    console.error(error);
  }
};
