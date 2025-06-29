import { IRequestConfig } from "./interceptor.interface";
import { getSession } from "next-auth/react";

/**
 * 요청 인터셉터
 * 모든 API 요청 전에 실행되는 함수
 */
export const requestInterceptor = async (config: IRequestConfig): Promise<IRequestConfig> => {
    const session = await getSession();
    const token = session?.accessToken;
    const headers = new Headers(config.headers);
    headers.set('Content-Type', 'application/json');
    if (token) {
        headers.set('Authorization', `${token}`);
    }
    return {
        ...config,
        headers,
    };
};