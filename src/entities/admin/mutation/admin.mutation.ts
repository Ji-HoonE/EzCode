import { adminTestCaseApi, adminProblemApi } from '@/api/service/admin/admin';
import {
  IDeleteTestCaseRequest,
  IRegisterProblemCategoryRequest,
  IRegisterProblemRequest,
  IRegisterTestCaseRequest,
  IUpdateProblemImageRequest,
  IUpdateProblemRequest,
  IUpdateTestCaseRequest,
} from '@/api/service/admin/admin.interface';
import { useMutation } from '@tanstack/react-query';

/**
 * @description 관리자 문제 뮤테이션
 */
export const useAdminRegisterProblemMutation = () => {
  return useMutation({
    mutationFn: async (formData: IRegisterProblemRequest) => {
      const response = await adminProblemApi.registerProblem(formData);
      return response;
    },
  });
};

export const useAdminRegisterProblemCategoryMutation = () => {
  return useMutation({
    mutationFn: async (params: IRegisterProblemCategoryRequest) => {
      const response = await adminProblemApi.registerProblemCategory(params);
      return response;
    },
  });
};

export const useAdminDeleteProblemMutation = () => {
  return useMutation({
    mutationFn: async (problemId: number) => {
      const response = await adminProblemApi.deleteProblem(problemId);
      return response;
    },
  });
};

export const useAdminUpdateProblemImageMutation = () => {
  return useMutation({
    mutationFn: async (params: IUpdateProblemImageRequest) => {
      const response = await adminProblemApi.updateProblemImage(params);
      return response;
    },
  });
};

export const useAdminUpdateProblemMutation = () => {
  return useMutation({
    mutationFn: async (params: IUpdateProblemRequest) => {
      const response = await adminProblemApi.updateProblem(params);
      return response;
    },
  });
};
/**
 * @description 관리자 테스트 케이스 뮤테이션
 * @returns
 */
export const useAdminRegisterTestCaseMutation = () => {
  return useMutation({
    mutationFn: async (params: IRegisterTestCaseRequest) => {
      const response = await adminTestCaseApi.registerTestCase(params);
      return response;
    },
  });
};

export const useAdminUpdateTestCaseMutation = () => {
  return useMutation({
    mutationFn: async (params: IUpdateTestCaseRequest) => {
      const response = await adminTestCaseApi.updateTestCase(params);
      return response;
    },
  });
};

export const useAdminDeleteTestCaseMutation = () => {
  return useMutation({
    mutationFn: async (params: IDeleteTestCaseRequest) => {
      const response = await adminTestCaseApi.deleteTestCase(params);
      return response;
    },
  });
};
