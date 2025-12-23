import { BASE_URL } from '@/constants/env';
import { useEmailVerify, useModifyInfo } from '@/entities/mypage/model/query';
import { IModifyBody, IMyInfo } from '@/entities/mypage/model/types';
import { useUserStore } from '@/entities/user/model/store';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useUserInfoEdit() {
  const { mutateAsync: emailVerfiy } = useEmailVerify(BASE_URL || '');
  const { mutateAsync: modify } = useModifyInfo();
  const [tab, setTab] = useState<'info' | 'modify'>('info');
  const [showEmailVerifyForm, setShowEmailVerifyForm] = useState(false);
  const [editForm, setEditForm] = useState<IMyInfo>({
    nickname: '',
    githubUrl: '',
    blogUrl: '',
    profileImageUrl: '',
    tier: '',
    introduction: '',
    age: 0,
    email: '',
    totalSolvedCount: 0,
    username: '',
    userRole: '',
    verified: false,
    userAuthTypes: [],
    language: null,
  });
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  const handleClickEdit = async () => {
    if (editForm.nickname.length < 1) {
      toast.error('닉네임을 확인해주세요.', {
        richColors: true,
        style: {
          fontWeight: 'bold',
          fontSize: '16px',
        },
      });
      return;
    }

    // API 요청용 body 생성
    const body: IModifyBody = {
      age: editForm.age,
      blogUrl: editForm.blogUrl || null,
      githubUrl: editForm.githubUrl || null,
      introduction: editForm.introduction || null,
      languageId: editForm.language?.id || null, // 여기서 id만 보냄
      nickname: editForm.nickname,
    };

    const response = await modify({
      request: body,
      image: editForm.profileImage ?? undefined,
    });

    setUser(response.result);
    toast.success(response.message, {
      richColors: false,
      style: {
        background: '#00d084',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: '16px',
        border: 'none',
      },
    });
    if (response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['my-info'] });
      setTab('info');
    }
  };
  const handleClickEmailVerifySend = async () => {
    try {
      await emailVerfiy();
      setShowEmailVerifyForm(true);
    } catch {
      setShowEmailVerifyForm(false);
    }
  };

  const handleClickEmailVerifyConfirm = () => {
    setShowEmailVerifyForm(false);
    queryClient.invalidateQueries({ queryKey: ['my-info'] });
  };

  return {
    handleClickEdit,
    tab,
    setTab,
    editForm,
    setEditForm,
    handleClickEmailVerifySend,
    showEmailVerifyForm,
    handleClickEmailVerifyConfirm,
  };
}
