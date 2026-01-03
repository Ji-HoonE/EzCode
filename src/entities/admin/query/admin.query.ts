import { adminTestCaseApi, adminProblemApi } from '@/api/service/admin/admin';
import { useQuery } from '@tanstack/react-query';

/** 관리자 문제 ID 리스트 반환 쿼리 */
export const useAdminProblemsListQuery = () => {
  return useQuery({
    queryKey: ['adminProblemsList'],
    queryFn: async () => {
      const response = await adminProblemApi.getProblemsIdList();
      return response;
    },
    select: (data) => {
      const problemIds = data.data.result;
      const options = problemIds.map((id: number) => ({
        label: `문제 ${id}`,
        value: String(id),
      }));
      return [{ label: '선택', value: '' }, ...options];
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
};

/** 관리자 문제 상세 조회 쿼리 */
export const useAdminGetProblemDetailQuery = (problemId: number) => {
  return useQuery({
    queryKey: ['adminGetProblemDetail', problemId],
    enabled: !!problemId,
    queryFn: async () => {
      const response = await adminProblemApi.getProblemDetail(problemId);
      return response;
    },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 10,
  });
};

/**  관리자 테스트 케이스 조회Api */
export const useAdminGetTestCasesQuery = (problemId: number) => {
  return useQuery({
    queryKey: ['adminGetTestCases', problemId],
    queryFn: async () => {
      const response = await adminTestCaseApi.getTestCases(problemId);
      return response;
    },
    enabled: !!problemId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
