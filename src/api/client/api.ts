import { BASE_URL } from '@/constants/env';
import { IApiResponseFormat } from '../interceptor/interceptor.interface';

import { responseInterceptor } from '../interceptor/response.interceptor';
import { API_URL } from '../constants/api.constants';
import {
  requestClientInterceptor,
  requestServerInterceptor,
} from '../interceptor/request.interceptor';

import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';
export type ReqType = 'client' | 'server';
interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  reqType?: ReqType;
}

interface ApiResponse<T = unknown> {
  data: IApiResponseFormat<T>;
}

/**
 * URL 빌더 함수
 */
const buildUrl = (endpoint: string, params?: Record<string, string>): string => {
  const url = new URL(`${BASE_URL}/api${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  return url.toString();
};

/**
 * 기본 요청 설정
 */
const defaultConfig: Partial<RequestConfig> = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  reqType: 'client',
};
const refreshToken = async (refreshToken: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api${API_URL.AUTH.REFRESH}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const data = await response.json();
    if (data.success === false && data.message?.includes('JWT expired')) {
      redirect('/signin');
    }
    if (response.ok) {
      return data.result.accessToken;
    }
  } catch (error) {
    throw error;
  }
};

const request = async <T>(
  endpoint: string,
  config: RequestConfig & { method: string }
): Promise<ApiResponse<T>> => {
  const url = buildUrl(endpoint, config?.params);

  try {
    const interceptedConfig = await (config.reqType === 'server'
      ? requestServerInterceptor(config)
      : requestClientInterceptor(config));

    const response = await fetch(url, interceptedConfig);

    if (response.status === 401) {
      // const session =
      //   config.reqType === 'server' ? await getServerSession(authOptions) : await getSession();

      if (Cookies.get('refreshToken')) {
        redirect('/signin');
      }

      try {
        const newAccessToken = await refreshToken(Cookies.get('refreshToken') || '');
        const retryConfig = await (config.reqType === 'server'
          ? requestServerInterceptor({
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            })
          : requestClientInterceptor({
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            }));

        const retryResponse = await fetch(url, retryConfig);
        return responseInterceptor<T>(retryResponse);
      } catch (error) {
        throw error;
      }
    }

    return responseInterceptor<T>(response);
  } catch (error) {
    throw error;
  }
};

const ApiHelper = {
  /**
   * GET 요청
   * @template T 응답 데이터의 타입
   * @param {string} endpoint - API 엔드포인트
   * @param {RequestConfig} [config] - 요청 설정
   * @returns {Promise<ApiResponse<T>>} API 응답
   */
  get: <T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    console.log('twconfig', config);
    return request<T>(endpoint, {
      method: 'GET',
      ...defaultConfig,
      ...config,
      reqType: config?.reqType || 'client',
    });
  },

  /**
   * POST 요청
   * @template T 응답 데이터의 타입
   * @param {string} endpoint - API 엔드포인트
   * @param {unknown} [data] - 요청 본문 데이터
   * @param {RequestConfig} [config] - 요청 설정
   * @returns {Promise<ApiResponse<T>>} API 응답
   */
  post: <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...defaultConfig,
      ...config,
      reqType: config?.reqType || 'client',
    });
  },

  /**
   * PUT 요청
   * @template T 응답 데이터의 타입
   * @param {string} endpoint - API 엔드포인트
   * @param {unknown} [data] - 요청 본문 데이터
   * @param {RequestConfig} [config] - 요청 설정
   * @returns {Promise<ApiResponse<T>>} API 응답
   */
  put: <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> => {
    const isFormData = data instanceof FormData;

    // defaultConfig + config 합치기
    const mergedConfig = {
      ...defaultConfig,
      ...config,
    };

    // headers 합치기 (HeadersInit 안전 처리)
    const headers = new Headers(mergedConfig.headers as HeadersInit);

    // FormData이면 Content-Type 제거 (대소문자 무시)
    if (isFormData) {
      headers.delete('Content-Type');
    }

    return request<T>(endpoint, {
      ...mergedConfig,
      method: 'PUT',
      body: isFormData ? (data as FormData) : JSON.stringify(data),
      headers,
      reqType: mergedConfig.reqType || 'client',
    });
  },

  /**
   * PATCH 요청
   * @template T 응답 데이터의 타입
   * @param {string} endpoint - API 엔드포인트
   * @param {unknown} [data] - 요청 본문 데이터
   * @param {RequestConfig} [config] - 요청 설정
   * @returns {Promise<ApiResponse<T>>} API 응답
   */
  patch: <T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...defaultConfig,
      ...config,
      reqType: config?.reqType || 'client',
    });
  },

  /**
   * DELETE 요청
   * @template T 응답 데이터의 타입
   * @param {string} endpoint - API 엔드포인트
   * @param {RequestConfig} [config] - 요청 설정
   * @returns {Promise<ApiResponse<T>>} API 응답
   */
  delete: <T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> => {
    return request<T>(endpoint, {
      method: 'DELETE',
      ...defaultConfig,
      ...config,
      reqType: config?.reqType || 'client',
    });
  },
};

export default ApiHelper;
