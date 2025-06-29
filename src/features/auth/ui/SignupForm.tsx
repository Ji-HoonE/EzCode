'use client';
import { Input } from '@/components/ui/input';
import useSignUp from '../hooks/useSignUp';

const SignupForm = () => {
  const { signUpInfo, handleChangeSignUpInfo, handleSignUpClick } = useSignUp();

  return (
    <div>
      <Input
        type="text"
        placeholder="username"
        name="username"
        value={signUpInfo.username}
        onChange={handleChangeSignUpInfo}
      />
      <Input
        type="text"
        placeholder="nickname"
        name="nickname"
        value={signUpInfo.nickname}
        onChange={handleChangeSignUpInfo}
      />
      <Input
        type="text"
        placeholder="email"
        name="email"
        value={signUpInfo.email}
        onChange={handleChangeSignUpInfo}
      />
      <Input
        type="password"
        placeholder="password"
        name="password"
        value={signUpInfo.password}
        onChange={handleChangeSignUpInfo}
      />
      <Input
        type="password"
        placeholder="passwordConfirm"
        name="passwordConfirm"
        value={signUpInfo.passwordConfirm}
        onChange={handleChangeSignUpInfo}
      />
      <Input
        type="age"
        placeholder="age"
        name="age"
        value={signUpInfo.age}
        onChange={handleChangeSignUpInfo}
      />
      <button onClick={handleSignUpClick}>회원가입</button>
    </div>
  );
}

export default SignupForm;