'use server';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { ISubmitPrepareData } from './getSubmitPrepareData.type';

/**코드 제출시 필요한 세션키, initcaseIds 를 리스폰스로 받음 */
export const getSubmitPrepareData = async (problemId: ProblemId) => {
  const path = getProblemIdPath(problemId, 'submit-prepare');
  const res = await ApiHelper.post<ISubmitPrepareData>(path, {}, { reqType: 'server' });

  if (!res.data.success) {
    console.log('에러');
    console.log(res);
    return;
  }
  return res.data.result;
};
