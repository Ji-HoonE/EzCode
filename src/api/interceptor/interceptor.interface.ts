export interface IRequestConfig extends RequestInit {
  params?: Record<string, string>;
}

export interface IApiResponseFormat<T> {
  success: boolean;
  status: number;
  message: string;
  result: T;
}

export interface IApiResponse<T = unknown> {
  data: IApiResponseFormat<T>;
}

export interface IRequestInterceptorConfig {
  headers?: HeadersInit;
  [key: string]: unknown;
}

export interface IResponseInterceptorConfig<T> {
  response: Response;
  data?: T;
}
