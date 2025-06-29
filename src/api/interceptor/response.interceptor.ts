
import { IApiResponse } from "./interceptor.interface";
import { toast } from "sonner";

/**
 * 응답 인터셉터
 * 모든 API 응답을 처리하는 함수
 */

const ERROR_THROW_PATHS = [
    '/auth/signin',
];
export const responseInterceptor = async <T>(response: Response): Promise<IApiResponse<T>> => {
    /** 응답 데이터 JSON 파싱 */
    const data = await response.json();
    if (!response.ok) {
        const isAuthPath = ERROR_THROW_PATHS.some(path => response.url.includes(path));
        if (response.status === 400) {
            if (!isAuthPath) {
                toast(data.message);
            }
        }
        if (isAuthPath) {
            throw {
                status: response.status,
                message: data.message,
                code: data.code
            };
        } else {
            throw new Error(data.message);
        }
    }
    return {
        data,
    };
};