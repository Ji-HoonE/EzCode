import { IRequestConfig } from './interceptor.interface';

import Cookies from 'js-cookie';

/**
 * 요청 인터셉터
 * 모든 API 요청 전에 실행되는 함수
 */

export const requestClientInterceptor = async (config: IRequestConfig): Promise<IRequestConfig> => {
  const token = Cookies.get('accessToken');
  const headers = new Headers(config.headers);

  if (!(config.body instanceof FormData)) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  return { ...config, headers };
};

export const requestServerInterceptor = async (config: IRequestConfig): Promise<IRequestConfig> => {
  // 서버에서도 js-cookie 사용
  const token = Cookies.get('accessToken');
  const headers = new Headers(config.headers);

  headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  return { ...config, headers };
};
