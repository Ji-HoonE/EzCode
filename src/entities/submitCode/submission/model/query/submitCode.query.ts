'use client';
import ApiHelper from '@/api/client/api';
import { getProblemIdPath } from '@/api/constants/api.constants';
import { ProblemId } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { ISubmitPrepareData } from './submitCode.query.type';
import { useProblemWebSocketStoreActions } from '@/features/submitCode/submission/model/useProblemWebSocketStore';
import { useSession } from 'next-auth/react';

/**코드 제출시 필요한 세션키, initcaseIds 를 리스폰스로 받음 */

export const useGetSubmitPrepareData = (problemId: ProblemId) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken?.split(' ')[1] as string;
  const { setPrepareData } = useProblemWebSocketStoreActions();

  const path = getProblemIdPath(problemId, 'submit-prepare');

  return useQuery({
    queryKey: ['submit-prepare'],
    queryFn: async () => {
      try {
        const res = await ApiHelper.post<ISubmitPrepareData>(`${path}`);
        if (res.data.result) {
          //이미 채점이 진행중일때는 result 가 없으므로, query에서 undefined 호출 방지를 위한 로직
          const prepareData = res.data.result;
          setPrepareData(prepareData);
          return prepareData;
        }
        return { sessionKey: null, testcaseIds: null };
      } catch {
        return { sessionKey: null, testcaseIds: null };
      }
    },
    enabled: !!accessToken,
  });
};
