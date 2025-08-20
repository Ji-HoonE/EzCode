'use client';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { ISubmitPrepareData } from './submitCode.query.type';
import { useProblemWebSocketStoreActions } from '@/features/submitCode/submission/model/useProblemWebSocketStore';
import { getSession } from 'next-auth/react';

/**코드 제출시 필요한 세션키, initcaseIds 를 리스폰스로 받음 */

export const useGetSubmitPrepareData = (problemId: ProblemId) => {
  const { setPrepareData } = useProblemWebSocketStoreActions();

  const path = getProblemIdPath(problemId, 'submit-prepare');

  return useQuery({
    queryKey: ['submit-prepare'],
    queryFn: async () => {
      const session = await getSession();
      const token = session?.accessToken;

      try {
        if (!token) return { sessionKey: null, testcaseIds: null };
        const res = await ApiHelper.post<ISubmitPrepareData>(`${path}`);
        const prepareData = res.data.result;
        if (prepareData) {
          setPrepareData(prepareData);
          return prepareData;
        }
      } catch {
        return { sessionKey: null, testcaseIds: null };
      }
    },
  });
};
