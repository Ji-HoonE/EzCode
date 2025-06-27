'use client';
import { useState } from 'react';
import { AuthType, SigninFormType, SignupFormType } from '../types';
import { useSignInMutation } from '@/query/auth/auth';

export default function useAuth(authForm: SigninFormType | SignupFormType, authType: AuthType) {
  const [formData, setFormData] = useState<SigninFormType | SignupFormType>(authForm);

  const handleChangeAuthForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value.trim() }));
  };

  const { mutateAsync: signInMutation } = useSignInMutation();

  console.log('authType', authType);

  const signIn = async () => {
    try {
      const response = await signInMutation(formData);
      console.log('response', response);
    } catch (error) {
      console.error(error);
    }
  }

  // const signinUser = async () => {
  //   fetch(`${BASE_URL}/api/auth/signin`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       ...formData,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       localStorage.setItem('accessToken', data.result.accessToken.split(/\s+/)[1]);
  //       localStorage.setItem('refreshToken', data.result.refreshToken);
  //     })
  //     .catch((err) => console.error('Error:', err));
  // };

  // const signupUser = async () => {
  //   fetch(`${BASE_URL}/api/auth/signup`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       ...formData,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.error('Error:', err));
  // };


  // const submitAuthForm = authType === 'signin' ? signinUser : signupUser;

  return { handleChangeAuthForm, signIn };
}
