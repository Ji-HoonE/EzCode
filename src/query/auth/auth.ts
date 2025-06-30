import ApiHelper from "@/api/client/api";
import { API_URL } from "@/api/constants/api.constants";
import { useMutation } from "@tanstack/react-query";
import { IRefreshResponse, ISignUpRequest, ISignUpResponse } from "./auth.interface";
import { BASE_URL } from "@/constants/env";

/** 회원가입 뮤테이션 */
export const useSignUpMutation = () => {
    return useMutation({
        mutationFn: async (params: ISignUpRequest) => {
            const response = await ApiHelper.post<ISignUpResponse>(
                API_URL.AUTH.SIGN_UP,
                params,
            );
            return response;
        },
    });
};


/** 로그아웃 뮤테이션 */
export const useLogoutMutation = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await ApiHelper.post<string>(API_URL.AUTH.LOGOUT);
            return response;
        },
    });
};

/** 비밀번호 찾기 뮤테이션 */
export const useFindPasswordMutation = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await ApiHelper.post<string>(API_URL.AUTH.FIND_PASSWORD);
            return response;
        },
    });
};

/** 토큰 리프레시 함수 - 인터셉터용 */
export const refreshAccessToken = async (refreshToken: string): Promise<IRefreshResponse> => {
    const response = await fetch(`${BASE_URL}/api${API_URL.AUTH.REFRESH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${refreshToken}`
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.result;
};