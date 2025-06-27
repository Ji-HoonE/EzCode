import { IApiResponse } from "./interceptor.interface";

/**
 * 응답 인터셉터
 * 모든 API 응답을 처리하는 함수
 */
export const responseInterceptor = async <T>(response: Response): Promise<IApiResponse<T>> => {
    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            // const refreshed = await refreshToken();
            //TODO : 리프레시 토큰 처리
            const refreshed = false
            if (refreshed) {
                const originalRequest = response.url;
                const retryResponse = await fetch(originalRequest, {
                    ...response,
                    headers: {
                        ...response.headers,
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                return responseInterceptor<T>(retryResponse);
            }
        }
        throw new Error(data.message);
    }
    return {
        status: response.status,
        data,
    };
};