import { IRequestConfig } from "./interceptor.interface";

/**
 * 요청 인터셉터
 * 모든 API 요청 전에 실행되는 함수
 */
export const requestInterceptor = (config: IRequestConfig): IRequestConfig => {
    const token = localStorage.getItem('accessToken');
    const headers = new Headers(config.headers);
    headers.set('Content-Type', 'application/json');
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    return {
        ...config,
        headers,
    };
};