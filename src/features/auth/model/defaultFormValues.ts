import { SigninFormType, SignupFormType } from '../types';

export const DEFAULT_SIGNIN_FORM_VALUE: SigninFormType = {
  email: 'string',
  password: 'string',
};

export const DEFAULT_SIGNUP_FORM_VALUE: SignupFormType = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
  nickname: '',
  age: 20,
};
