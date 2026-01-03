import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import {
  IDeleteTestCaseRequest,
  IRegisterProblemCategoryRequest,
  IRegisterProblemRequest,
  IRegisterTestCaseRequest,
  ITestCaseResponse,
  IUpdateProblemImageRequest,
  IUpdateProblemRequest,
  IUpdateTestCaseRequest,
} from './admin.interface';
import { IDetailProblemResponse } from '@/entities/problem/api/server/getDetailProblem.type';

/**
 * @description 관리자 테스트 케이스 관련 Api
 */
export const adminTestCaseApi = {
  getTestCases: async (problemId: number) => {
    const response = await ApiHelper.get<ITestCaseResponse[]>(
      `${API_URL.ADMIN.TEST_CASES.BASE.replace('{problemId}', problemId.toString())}`,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  registerTestCase: async (params: IRegisterTestCaseRequest) => {
    const { problemId, ...request } = params;
    const response = await ApiHelper.post(
      API_URL.ADMIN.TEST_CASES.BASE.replace('{problemId}', problemId.toString()),
      request,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  updateTestCase: async (params: IUpdateTestCaseRequest) => {
    const { problemId, testcaseId, ...request } = params;
    const response = await ApiHelper.put(
      `${API_URL.ADMIN.TEST_CASES.ID.replace('{problemId}', problemId.toString()).replace('{testcaseId}', testcaseId.toString())}`,
      request,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  deleteTestCase: async (params: IDeleteTestCaseRequest) => {
    const response = await ApiHelper.delete(
      `${API_URL.ADMIN.TEST_CASES.ID.replace('{problemId}', params.problemId.toString()).replace('{testcaseId}', params.testcaseId.toString())}`,
      { reqType: 'client' }
    );
    return response;
  },
};

/**
 * @description 관리자 문제 관련 Api
 */
export const adminProblemApi = {
  getProblemsIdList: async () => {
    const response = await ApiHelper.get<number[]>(API_URL.ADMIN.PROBLEM.LIST, {
      reqType: 'client',
    });
    return response;
  },
  getProblemDetail: async (problemId: number) => {
    const response = await ApiHelper.get<IDetailProblemResponse>(
      `${API_URL.PROBLEM.GET_PROBLEMS}/${problemId}`,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  registerProblemCategory: async (params: IRegisterProblemCategoryRequest) => {
    const response = await ApiHelper.post(API_URL.ADMIN.PROBLEM.CATEGORY, params, {
      reqType: 'client',
    });
    return response;
  },
  deleteProblem: async (problemId: number) => {
    const response = await ApiHelper.delete(`${API_URL.ADMIN.PROBLEM.BASE}/${problemId}`, {
      reqType: 'client',
    });
    return response;
  },
  registerProblem: async (formData: IRegisterProblemRequest) => {
    const multipartFormData = new FormData();
    const { image, request } = formData;
    multipartFormData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' })
    );
    if (image) {
      multipartFormData.append('image', image);
    }
    const response = await ApiHelper.post(API_URL.ADMIN.PROBLEM.BASE, multipartFormData, {
      reqType: 'client',
    });
    return response;
  },
  updateProblem: async (params: IUpdateProblemRequest) => {
    const { problemId, image, request } = params;
    const multipartFormData = new FormData();
    multipartFormData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' })
    );
    if (image) {
      multipartFormData.append('image', image);
    }
    const response = await ApiHelper.put(
      `${API_URL.ADMIN.PROBLEM.BASE}/${problemId}`,
      multipartFormData,
      {
        reqType: 'client',
      }
    );
    return response;
  },
  updateProblemImage: async (params: IUpdateProblemImageRequest) => {
    const { problemId, image } = params;
    if (!image) {
      throw new Error('이미지 파일이 필요합니다.');
    }
    const multipartFormData = new FormData();
    multipartFormData.append('image', image);
    const response = await ApiHelper.put(
      API_URL.ADMIN.PROBLEM.IMAGE.replace('{problemId}', String(problemId)),
      multipartFormData,
      {
        reqType: 'client',
      }
    );
    return response;
  },
};
