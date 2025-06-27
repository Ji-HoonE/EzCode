'use client';
import { Input } from '@/components/ui/input';
import useAuth from '../hooks/useAuth';
import { DEFAULT_SIGNIN_FORM_VALUE } from '../model/defaultFormValues';

export default function SigninForm() {
  const { handleChangeAuthForm, signIn } = useAuth(DEFAULT_SIGNIN_FORM_VALUE, 'signin');

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      }}
    >
      <Input
        type="text"
        placeholder="email"
        name="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeAuthForm('email', e.target.value)
        }
      />
      <Input
        type="password"
        placeholder="비번"
        name="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeAuthForm('password', e.target.value)
        }
      />
      <button type="submit" onClick={signIn}>로그인</button>
    </form>
  );
}
