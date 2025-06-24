'use client';
import { Input } from '@/components/ui/input';
import useAuth from '../hooks/useAuth';
import { DEFAULT_SIGNUP_FORM_VALUE } from '../model/defaultFormValues';

export default function SignupForm() {
  const { handleChangeAuthForm, submitAuthForm } = useAuth(DEFAULT_SIGNUP_FORM_VALUE, 'signup');

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitAuthForm();
      }}
    >
      <Input
        type="text"
        placeholder="username"
        name="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeAuthForm('username', e.target.value)
        }
      />
      <Input
        type="text"
        placeholder="nickname"
        name="nickname"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeAuthForm('nickname', e.target.value)
        }
      />
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
        placeholder="password"
        name="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeAuthForm('password', e.target.value)
        }
      />
      <Input
        type="password"
        placeholder="passwordConfirm"
        name="passwordConfirm"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChangeAuthForm('passwordConfirm', e.target.value)
        }
      />
      <button type="submit">회원가입</button>
    </form>
  );
}
