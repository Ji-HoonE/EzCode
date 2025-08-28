import ApiHelper from '@/api/client/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  AiReview,
  ChangePasswordBody,
  ChangePasswordRequest,
  DailySolved,
  ILanguages,
  IModifyBody,
  IMyInfo,
  Ranking,
  Report,
  SubmissionsResonse,
} from './types';
import { TPeriod } from '@/shared/types/mypage.type';
import { API_URL } from '@/api/constants/api.constants';
import { useSession } from 'next-auth/react';

export const useMyInfoQuery = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken?.split(' ')[1] as string;
  return useQuery({
    queryKey: ['my-info'],
    queryFn: async () => {
      const response = await ApiHelper.get<IMyInfo>('/users');
      return response;
    },
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyRankingQuery = (period: TPeriod) => {
  return useQuery({
    queryKey: ['my-ranking'],
    queryFn: async () => {
      const response = await ApiHelper.get<Ranking[]>(`/rankings/me/around?period=${period}`);
      return response;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useMyAiReviewCheckQuery = () => {
  return useQuery({
    queryKey: ['my-review'],
    queryFn: async () => {
      const response = await ApiHelper.get<AiReview>(`${API_URL.USER.TOKEN_COUNT}`);
      return response;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useMyDailySolved = () => {
  return useQuery({
    queryKey: ['my-daily-solved'],
    queryFn: async () => {
      const response = await ApiHelper.get<DailySolved>(`/users/daily-solved`);
      return response;
    },

    staleTime: 1000 * 60 * 5,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (params: ChangePasswordBody) => {
      const response = await ApiHelper.put<ChangePasswordRequest>(
        `${API_URL.MYPAGE.CHANGE_PASSWORD}`,
        params
      );
      console.log(response);
      if (response.data.status === 200) {
        return response.data.result.message;
      } else {
        return response.data.message;
      }
    },
  });
};

export const useSubmissionList = () => {
  return useQuery({
    queryKey: ['submission'],
    queryFn: async () => {
      const response = await ApiHelper.get<SubmissionsResonse[]>(API_URL.MYPAGE.SUBMISSION);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useEmailVerify = (redirectUrl: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.post<ChangePasswordRequest>(API_URL.MYPAGE.VERIFY_EMAIL, {
        redirectUrl: redirectUrl,
      });
      if (response.data.status === 200) {
        return response.data.result.message;
      } else {
        return response.data.message;
      }
    },
  });
};

export const useReportList = () => {
  return useQuery({
    queryKey: ['report'],
    queryFn: async () => {
      const response = await ApiHelper.get<Report[]>(API_URL.MYPAGE.REPORT);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useModifyInfo = () => {
  return useMutation({
    mutationFn: async ({
      request,
      image,
    }: {
      request: IModifyBody; // 닉네임, 블로그, 깃허브 등 정보
      image?: File; // 프로필 이미지 (선택)
    }) => {
      console.log('image', image);
      console.log('request', request);
      const formData = new FormData();

      // request(JSON) 추가
      formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));

      // image(File) 추가
      if (image) {
        formData.append('image', image);
      }

      const response = await ApiHelper.put(API_URL.MYPAGE.MODIFY_INFO, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    },
  });
};

export const useChangeProfileImg = (image: string) => {
  return useMutation({
    mutationFn: async () => {
      const response = await ApiHelper.put(API_URL.MYPAGE.UPLOAD_IMG, image);
      return response.data;
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);

      const response = await ApiHelper.put<{ message: string }>(
        API_URL.MYPAGE.UPLOAD_IMG,
        formData
      );

      return response.data;
    },
  });
};

export const useGetLanguageList = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: async () => {
      const response = await ApiHelper.get<ILanguages[]>(API_URL.LANGUAGES);
      return response;
    },
  });
};
