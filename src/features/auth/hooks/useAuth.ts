'use client';
import { BASE_URL } from '@/types/url';
import { useState } from 'react';
import { AuthType, SigninFormType, SignupFormType } from '../types';

export default function useAuth(authForm: any, authType: AuthType) {
  const [formData, setFormData] = useState<SigninFormType | SignupFormType>(authForm);

  const handleChangeAuthForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value.trim() }));
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

  const signupUser = async () => {
    fetch(`${BASE_URL}/api/auth/signup`, {
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
        console.log(data);
      })
      .catch((err) => console.error('Error:', err));
  };

  const submitAuthForm = authType === 'signin' ? signinUser : signupUser;

  return { handleChangeAuthForm, submitAuthForm };
}
