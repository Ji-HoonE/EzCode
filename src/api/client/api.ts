import { BASE_URL } from '@/constants/env';
import { responseInterceptor } from '../interceptor/response.interceptor';
import { requestInterceptor } from '../interceptor/request.interceptor';

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
}

interface ApiResponse<T = unknown> {
  status: number;
  data: T;
  error?: string;
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

const ApiHelper = {
  /**
   * GET 요청
   * @template T 응답 데이터의 타입
   * @param {string} endpoint - API 엔드포인트
   * @param {RequestConfig} [config] - 요청 설정
   * @returns {Promise<ApiResponse<T>>} API 응답
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint, config?.params);
    const interceptedConfig = requestInterceptor({
      method: 'GET',
      ...config,
    });

    const response = await fetch(url, interceptedConfig);
    return responseInterceptor<T>(response);
  },
  /**
     * POST 요청
     * @template T 응답 데이터의 타입
     * @param {string} endpoint - API 엔드포인트
     * @param {unknown} [data] - 요청 본문 데이터
     * @param {RequestConfig} [config] - 요청 설정
     * @returns {Promise<ApiResponse<T>>} API 응답
     */
  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint, config?.params);
    const interceptedConfig = requestInterceptor({
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });

    const response = await fetch(url, interceptedConfig);
    return responseInterceptor<T>(response);
  },

  /**
  * PUT 요청
  * @template T 응답 데이터의 타입
  * @param {string} endpoint - API 엔드포인트
  * @param {unknown} [data] - 요청 본문 데이터
  * @param {RequestConfig} [config] - 요청 설정
  * @returns {Promise<ApiResponse<T>>} API 응답
  */
  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint, config?.params);
    const interceptedConfig = requestInterceptor({
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });

    const response = await fetch(url, interceptedConfig);
    return responseInterceptor<T>(response);
  },
  /**
   * DELETE 요청
   * @template T 응답 데이터의 타입
   * @param {string} endpoint - API 엔드포인트
   * @param {RequestConfig} [config] - 요청 설정
   * @returns {Promise<ApiResponse<T>>} API 응답
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = buildUrl(endpoint, config?.params);
    const interceptedConfig = requestInterceptor({
      method: 'DELETE',
      ...config,
    });

    const response = await fetch(url, interceptedConfig);
    return responseInterceptor<T>(response);
  },
};

export default ApiHelper;