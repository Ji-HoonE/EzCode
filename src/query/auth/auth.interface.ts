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
}

export interface IFindPasswordRequest {
    email: string;
    redirectUrl: string;
}

/** refresh 토큰 응답 인터페이스 */
export interface IRefreshResponse {
    token: string;
}