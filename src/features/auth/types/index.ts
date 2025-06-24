export interface SigninFormType {
  email: string;
  password: string;
}

export interface SignupFormType {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  nickname: string;
  age: number;
}

export type AuthType = 'signin' | 'signup';
