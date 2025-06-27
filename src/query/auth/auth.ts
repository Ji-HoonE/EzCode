import ApiHelper from "@/api/client/api";
import { API_URL } from "@/api/constants/api.constants";
import { useMutation } from "@tanstack/react-query";
import { ISignInRequest, ISignInResponse } from "./auth.interface";

/** 로그인 뮤테이션 */
export const useSignInMutation = () => {
    return useMutation({
        mutationFn: async (credentials: ISignInRequest) => {
            const response = await ApiHelper.post<ISignInResponse>(
                API_URL.AUTH.SIGN_IN,
                credentials,
                {
                    credentials: 'include',
                }
            );
            return response.data;
        },
    });
};