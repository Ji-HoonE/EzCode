'use server';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { IUseSubmitQueryResponse } from './getSessionKey.type';

/**코드 제출시 필요한 세션키, initcaseIds */
export const getSessionKey = async (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'submit-prepare');
  const res = await ApiHelper.post<IUseSubmitQueryResponse>(path, {}, { reqType: 'server' });

  if (!res.data.success) {
    console.log('에러');
    return;
  }
  return res.data.result.sessionKey;
};
