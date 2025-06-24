'use client';
import { BASE_URL } from '@/types/url';
import { useState } from 'react';

export default function useAuth(authForm: any) {
  const [formData, setFormData] = useState(authForm);

  const handleChangeAuthForm = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value.trim() }));
  };

  const signinUser = async () => {
    fetch(`${BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('accessToken', data.result.accessToken);
        localStorage.setItem('refreshToken', data.result.refreshToken);
      })
      .catch((err) => console.error('Error:', err));
  };

  return { handleChangeAuthForm, signinUser };
}
