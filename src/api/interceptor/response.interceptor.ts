import { IApiResponse } from './interceptor.interface';
/**
 * 응답 인터셉터
 * 모든 API 응답을 처리하는 함수
 */

const ERROR_THROW_PATHS = ['/auth/signin'];
export const responseInterceptor = async <T>(response: Response): Promise<IApiResponse<T>> => {
  /** 응답 데이터 JSON 파싱 */
  let data = null;

  try {
    const text = await response.text();
    data = text ? JSON.parse(text) : null;
  } catch (error) {
    data = null;
  }
  if (!response.ok) {
    const isAuthPath = ERROR_THROW_PATHS.some((path) => response.url.includes(path));
    if (isAuthPath) {
      throw {
        status: response.status,
        message: data.message,
        code: data.code,
      };
    }
  }
  return {
    data,
  };
};
