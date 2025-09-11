import ApiHelper from '@/api/client/api';
import { API_URL } from '@/api/constants/api.constants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  IFindPasswordRequest,
  IFindPasswordResponse,
  IRefreshResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
  ISignUpRequest,
  ISignUpResponse,
  IVerifyResetPasswordRequest,
  IVerifyResetPasswordResponse,
} from '@/entities/auth/model/auth.interface';
import { BASE_URL } from '@/constants/env';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/entities/user/model/store';

/** 회원가입 뮤테이션 */
export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async (params: ISignUpRequest) => {
      const response = await ApiHelper.post<ISignUpResponse>(API_URL.AUTH.SIGN_UP, params);
      return response;
    },
  });
};

/** 로그아웃 뮤테이션 */
export const useLogoutMutation = () => {
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.post<string>(API_URL.AUTH.LOGOUT, { reqType: 'client' });
      return response;
    },
    onSuccess: async () => {
      console.log('로그아웃');
      // await signOut({ redirect: false, callbackUrl: '/' });
      Cookies.remove('refreshToken');
      Cookies.remove('accessToken');
      setUser(null);
      // 로그아웃 시 내정보조회하는 api 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
      queryClient.invalidateQueries({ queryKey: ['my-ranking'] });
      queryClient.invalidateQueries({ queryKey: ['my-review'] });
      router.push('/');
    },
  });
};

/** 토큰 리프레시 함수 - 인터셉터용 */
export const refreshAccessToken = async (refreshToken: string): Promise<IRefreshResponse> => {
  const response = await fetch(`${BASE_URL}/api${API_URL.AUTH.REFRESH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.result;
};

/** 비밀번호 찾기 요청 뮤테이션 */
export const useFindPasswordMutation = () => {
  return useMutation({
    mutationFn: async (params: IFindPasswordRequest) => {
      const response = await ApiHelper.post<IFindPasswordResponse>(
        API_URL.AUTH.FIND_PASSWORD,
        params
      );
      return response;
    },
  });
};

/** 비밀번호 변경 뮤테이션 */
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (params: IResetPasswordRequest) => {
      const response = await ApiHelper.post<IResetPasswordResponse>(
        API_URL.AUTH.RESET_PASSWORD,
        params
      );
      return response;
    },
  });
};

/** 인증 토큰 쿼리 확인 */
export const useVerifyResetPasswordQuery = (params: IVerifyResetPasswordRequest) => {
  return useQuery({
    queryKey: ['verifyResetPassword', params],
    queryFn: async () => {
      const response = await ApiHelper.get<IVerifyResetPasswordResponse>(
        `${API_URL.AUTH.FIND_PASSWORD_VERIFY}?email=${params.email}&key=${params.key}`,
        { reqType: 'client' }
      );
      return response;
    },
  });
};
