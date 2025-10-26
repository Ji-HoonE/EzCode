/** 로그인 요청 인터페이스 */
export interface ISignInRequest {
  email: string;
  password: string;
}
/** 로그인 응답 인터페이스 */
export interface ISignInResponse {
  accessToken: string;
  refreshToken: string;
}

/** 회원가입 요청 인터페이스 */
export interface ISignUpRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  nickname: string;
  age: number;
}
/** 회원가입 응답 인터페이스 */
export interface ISignUpResponse {
  message: string;
  accessToken: string;
  refreshToken : string
}

/** 비밀번호 찾기 요청 인터페이스 */
export interface IFindPasswordRequest {
  email: string;
  redirectUrl: string;
}

/** 비밀번호 찾기 응답 인터페이스 */
export interface IFindPasswordResponse {
  message: string;
}

/** refresh 토큰 응답 인터페이스 */
export interface IRefreshResponse {
  token: string;
}

export interface IResetPasswordRequest {
  tempResetToken: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export interface IResetPasswordResponse {
  message: string;
}

export interface IVerifyResetPasswordRequest {
  email: string;
  key: string;
}

export interface IVerifyResetPasswordResponse {
  message: string;
  tempResetToken: string;
}
