'use client';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { ISubmitPrepareData } from './submitCode.query.type';
import { useProblemWebSocketStoreActions } from '@/features/submitCode/submission/model/useProblemWebSocketStore';

/**코드 제출시 필요한 세션키, initcaseIds 를 리스폰스로 받음 */

export const useGetSubmitPrepareData = (problemId: ProblemId, token: string | null) => {
  const { setAuth, setTestCaseIds } = useProblemWebSocketStoreActions();

  const path = getProblemIdPath(problemId, 'submit-prepare');

  return useQuery({
    queryKey: ['submit-prepare'],
    queryFn: async () => {
      try {
        if (!token) return { sessionKey: null, testcaseIds: null };
        const res = await ApiHelper.post<ISubmitPrepareData>(`${path}`);
        const prepareData = res.data.result;
        if (prepareData.sessionKey && prepareData.testcaseIds) {
          setAuth('sessionKey', prepareData.sessionKey);
          setTestCaseIds(prepareData.testcaseIds);
        }

        return prepareData;
      } catch {
        return { sessionKey: null, testcaseIds: null };
      }
    },
  });
};
